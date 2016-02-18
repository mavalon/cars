'use strict';
let env = require('../config/env');
let mongoose = require('mongoose');

mongoose.connect(env.MONGO_PATH);

const modelsSchema = {
    name: String,
    year: Number
};

const trimsSchema = {
    name: String
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
    }
};
