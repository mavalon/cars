'use strict';

let response = require('../utilities/response');
let jsonfile = require('jsonfile');
let _ = require('lodash');
let path = require('path');
let mongo = require('../utilities/mongo');

let cwd = process.cwd();

module.exports = {

    getAllYears(req, res) {
        mongo.getDistinctValues('models', 'year', (err, yrs) => {
            response.success(res, {years: yrs }, 200);
        });
        /*
         const file = path.normalize(`${cwd}/data/models.json`);
         let yrs = [];
         jsonfile.readFile(file, function(err, obj) {
         _(obj.years).forEach(function(o) {
         yrs.push(o.year);
         });

         let Years = {
         years: yrs
         };

         response.success(res, Years, 200);
         });
         */
    },

    getYearModels(req, res) {
        let params = req.params;
        const sorting = ['name', 'asc'];
        mongo.filterAndSort('models', {year: parseInt(params.year, 10)}, sorting, (err, models) => {
            response.success(res, models, 200);
        });
        /*
        const file = path.normalize(`${cwd}/data/models.json`);
        let models = [];

        jsonfile.readFile(file, (err, obj) => {
            for (let n = 0; n < obj.years.length; n++) {
                let m = obj.years[n];
                let year = m.year;
                if (parseInt(year, 10) === parseInt(params.year, 10)) {
                    for (let x = 0; x < m.models.length; x++) {
                        let model = m.models[x];
                        models.push({
                            id: model.id,
                            name: `${model.name} ${model.year}`
                        });
                    }

                    break;
                }
            }

            response.success(res, models, 200);
        });
         */
    },

    getModelTrims(req, res) {
        let params = req.params;
        const file = path.normalize(`${cwd}/data/models.json`);
        let trims = [];

        jsonfile.readFile(file, (err, obj) => {
            for (let n = 0; n < obj.years.length; n++) {
                let m = obj.years[n];
                if (parseInt(m.year, 10) === parseInt(params.year, 10)) {
                    for (let x = 0; x < m.models.length; x++) {
                        let model = m.models[x];

                        if (parseInt(model.id, 10) === parseInt(params.model, 10)) {
                            if (model.trims) {
                                for (let n = 0; n < model.trims.length; n++) {
                                    let trim = model.trims[n];
                                    trims.push({
                                        id: trim.id,
                                        name: trim.name
                                    });
                                }
                                break;
                            }
                        }
                    }

                    break;
                }
            }

            response.success(res, trims, 200);
        });
    }

};

