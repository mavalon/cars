'use strict';
let env = require('../config/env');
let mongoose = require('mongoose');
let jsonfile = require('jsonfile');
let htmlToJson = require('html-to-json');
let path = require('path');
let util = require('util');
let fs = require('fs');

let cwd = process.cwd();

mongoose.connect(env.MONGO_PATH);
const db = mongoose.connection;

const modelsSchema = {
    name: String,
    year: Number,
    id: String,
    type: String,
    price: String
};

const trimsSchema = {
    id: String,
    name: String,
    modelId: String,
    description: String,
    mpgCity: String,
    mpgHighway: String,
    noOfSeats: String,
    horsepower: String,
    price: String,
    defaultImageSmall: String,
    defaultImageMedium: String,
    defaultImageLarge: String
};

let Vehicles = mongoose.model('Model', modelsSchema, 'models');
let Trims = mongoose.model('Trim', trimsSchema, 'trims');

module.exports = {

    getDistinctYears(req, res) {
        Vehicles.distinct('year', (err, result) => {
            res.send({years: result});
        });
    },

    getModelsForYear(req, res) {
        let params = req.params;
        const sorting = ['name', 'asc'];
        const filters = {year: parseInt(params.year, 10)};
        Vehicles.find(filters).sort([sorting]).exec((err, result) => {
            res.send(result);
        });
    },

    getModelTrims(req, res) {
        const params = req.params;
        const sorting = ['name', 'asc'];
        const filters = {modelId: params.model};
        Trims.find(filters).sort([sorting]).exec((err, result) => {
            res.send(result);
        });
    },

    getAllModels(req, res) {
        Vehicles.find((err, result) => {
            res.send(result);
        });
    },

    getModel(req, res) {
        const params = req.params;
        const filters = {id: params.id};
        Vehicles.find(filters).exec((err, result) => {
            res.send(result);
        });
    },

    importModels() {
        //importModels(req, res) {
        const save = (data) => {
            data.save((err, data) => {
                if (err) return console.error(err);
                console.dir(data.id);
            });
        };

        const file = path.normalize(`${cwd}/data/vehicles.json`);
        //let trims = [];
        console.log(this);

        jsonfile.readFile(file, (err, obj) => {
            for (let n = 0; n < obj.length; n++) {
                let model = obj[n];
                const car = new Vehicles({
                    id: model.ID,
                    name: model.ModelName,
                    type: model.VehicleType,
                    year: model.ModelYear,
                    price: model.BasePrice
                });

                save(car);

                for (let t = 0; t < model.Trims.length; t++) {
                    let trim = model.Trims[t];
                    const trimLevel = new Trims({
                        id: trim.ID,
                        name: trim.TrimName,
                        modelId: model.ID,
                        description: trim.TrimDescription,
                        mpgCity: trim.MPGCity,
                        mpgHighway: trim.MPGHighway,
                        noOfSeats: trim.NoOfSeats,
                        horsepower: trim.HorsePower,
                        price: trim.Price,
                        defaultImageSmall: trim.DefaultImageSmall,
                        defaultImageMedium: trim.DefaultImageMedium,
                        defaultImageLarge: trim.DefaultImageLarge
                    });
                    save(trimLevel);
                }
            }
            //process.exit();
        });

        /*

         console.log('done');
         const params = req.params;
         const filters = {_id: params.id};
         Vehicles.find(filters).exec((err, result) => {
         res.send(result);
         });
         */
    },

    postSpecs(req, res) {
        const params = req.params;
        importSpecs('sonata-hybrid');
        res.send(JSON.stringify(params));
    },

    cmdSpecs() {
        const args = process.argv;
        const urls = (args.slice(2));

        if (urls.length === 0) {
            console.log('specify a specifications model');
            process.exit();
        }
        importSpecs(urls[0], true);
    },

    getSpecifications(req, res) {
        const params = req.params;
        const fname = params.filename;
        const file = path.normalize(`${cwd}/data/json/${fname}.json`);
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            //let json = JSON.parse(data);
            res.send(data);
        });
    }

};

function importSpecs(model, isConsole) {
    const getLowestChild = (child) => {
        if (!child) return '';
        if (child.name === 'img') {
            return child.attribs.title;
        }
        if (child.children) {
            if (child.children.length > 0) {
                return getLowestChild(child.children[0]);
            }
        }
        return child.data;
    };
    const getImageSrc = (child) => {
        if (!child) return '';
        if (child.name === 'img') {
            return child.attribs.src;
        }
        if (child.children) {
            if (child.children.length > 0) {
                let nextChild = child.children[0];
                return getImageSrc(nextChild);
            }
        }
        return child.data;
    };

    try {
        console.log('start import');
        const url = `https://www.hyundaiusa.com/${model}/specifications.aspx`;
        htmlToJson.request(url, {
            divs: ['.specs_trim_table_container', ($divs) => {
                return $divs;
            }]
        }, (err, result) => {
            let obj = {
                sections: []
            };

            // loop through all main sections
            for (let m = 0; m < result.divs.length; m++) {
                const section = result.divs[m];
                const sectionName = section.find('h3').text();
                console.log(`section: ${sectionName}`);

                // console.log(util.inspect(section, {showHidden: false, depth: 2}));
                let packages = null;
                let warranty = null;
                const isPackage = (section[0].attribs.id === 'specsTrimPRICINGPACKAGES');
                const isWarranty = (section[0].attribs.id === 'specsTrimWarranty');
                console.log(isWarranty);
                if (isPackage) {
                    packages = section.find('.package_container');
                }
                if (isWarranty) {
                    warranty = section.find('.coverage_table');
                }
                /*
                 */
                const subsections = section.find('.static_table');
                let subsectionsArr = [];

                // loop through all subsections
                for (let s = 0; s < subsections.length; s++) {
                    const subsection = subsections[s];
                    const subsectionObj = {};
                    let thead = subsection.children.find(x => x.name === 'thead').children.find(y => y.name === 'tr');
                    let tbody = subsection.children.find(x => x.name === 'tbody');

                    let begin = true;
                    let trims = [];

                    // loop through table headers
                    for (let r = 0; r < thead.children.length; r++) {
                        let row = thead.children[r];
                        if (row.name === 'th') {
                            if (begin) {
                                // subsection name
                                subsectionObj.name = getLowestChild(row.children[0]);
                                begin = false;
                            } else {
                                // add to trims array
                                const child = getLowestChild(row.children[0]);
                                trims.push(child);
                            }
                        }
                    }
                    subsectionObj.trims = trims;
                    subsectionObj.specs = [];
                    //subsectionObj.warranties = [];


                    // loop through table body (i.e., specs)
                    for (let b = 0; b < tbody.children.length; b++) {
                        let row = tbody.children[b];

                        if (row.name === 'tr') {
                            let trimCount = 0;
                            let start = true;
                            let spec = {
                                name: '',
                                trims: []
                            };
                            spec.trims = [];

                            for (let c = 0; c < row.children.length; c++) {
                                let cell = row.children[c];

                                if (cell.name === 'td') {
                                    if (start) {
                                        spec.name = getLowestChild(cell.children[0]);
                                        start = false;
                                    } else {
                                        let trim = {
                                            name: subsectionObj.trims[trimCount],
                                            value: getLowestChild(cell.children[0])
                                        };
                                        spec.trims.push(trim);
                                        trimCount++;
                                    }
                                }
                            }
                            subsectionObj.specs.push(spec);
                        }
                    }
                    //console.log('now');
                    //console.log(isPackage);
                    if (isPackage) {
                        //let packages = [];
                        subsectionObj.packages = [];
                        for (let p = 0; p < packages.length; p++) {
                            const pkg = packages[p].children;
                            //console.log(pkg);

                            let pack = {};
                            for (let d = 0; d < pkg.length; d++) {
                                if (pkg[d].type !== 'text') {
                                    let elem = pkg[d];

                                    let cont = true;
                                    if (elem.attribs) {
                                        if (elem.attribs.class) {
                                            switch (elem.attribs.class) {
                                                case 'package_title':
                                                    pack.title = getLowestChild(elem);
                                                    break;
                                                case 'package_detail':
                                                    let details = [];
                                                    for (let l = 0; l < elem.children.length; l++) {
                                                        let item = elem.children[l];
                                                        if (item.name) {
                                                            if (item.name === 'li') {
                                                                let listitem = getLowestChild(item.children[0]);
                                                                details.push(listitem);
                                                            }
                                                        }
                                                    }
                                                    pack.details = details;
                                                    break;
                                                case 'package_image':
                                                    for (let e = 0; e < elem.children.length; e++) {
                                                        let o = elem.children[e];
                                                        if (o.attribs) {
                                                            if (o.attribs.class) {
                                                                let cls = o.attribs.class;
                                                                console.log(cls);
                                                                pack.image = o.attribs.src;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'package_total':
                                                    for (let i = 0; i < elem.children.length; i++) {
                                                        let span = elem.children[i];
                                                        if (span.name) {
                                                            if (span.name === 'span') {
                                                                pack.total = getLowestChild(span);
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                            subsectionObj.packages.push(pack); // = [..., pack];
                            ///console.log(JSON.stringify(pkg));
                            // console.log(util.inspect(pkg, {showHidden: false, depth: 1}));
                        }
                    }
                    /*
                     */
                    subsectionsArr.push(subsectionObj);
                }

                let sectionObject = {
                    category: sectionName,
                    specifications: subsectionsArr
                };
                if (isWarranty) {
                    sectionObject.warranties = [];
                    if (warranty.length > 0) {
                        const trs = warranty[0].children;
                        for (let r = 0; r < trs.length; r++) {
                            const tr = trs[r];
                            if (tr.name === 'tr') {
                                for (let c = 0; c < tr.children.length; c++) {
                                    const child = tr.children[c];
                                    if (child.name === 'td') {
                                        sectionObject.warranties.push(getImageSrc(child));
                                    }
                                }
                            }
                        }
                    }
                }
                obj.sections.push(sectionObject);
            }

            const file = path.normalize(`${cwd}/data/json/${model}.json`);

            jsonfile.writeFile(file, obj, (err) => {
                console.log('errr');
                console.error(err);
                if (isConsole) {
                    process.exit();
                }
            });
        });
    } catch (ass) {
        console.log(ass);
    }
}
