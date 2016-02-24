'use strict';
let env = require('../config/env');
let mongoose = require('mongoose');
let jsonfile = require('jsonfile');
let htmlToJson = require('html-to-json');
let path = require('path');

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
        const filters = {_id: params.id};
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

    importSpecs() {
        const args = process.argv;
        const urls = (args.slice(2));

        if (urls.length === 0) {
            console.log('specify a specifications model');
            process.exit();
        }

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

        try {
            console.log('start import');
            const url = `https://www.hyundaiusa.com/${urls[0]}/specifications.aspx`;
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

                        subsectionsArr.push(subsectionObj);
                    }

                    let sectionObject = {
                        category: sectionName,
                        specifications: subsectionsArr
                    };
                    obj.sections.push(sectionObject);
                }

                const file = path.normalize(`${cwd}/data/json/${urls[0]}.json`);

                jsonfile.writeFile(file, obj, (err) => {
                    console.log('errr');
                    console.error(err);
                    process.exit();
                });
            });
        } catch (ass) {
            console.log(ass);
        }
    }
};
