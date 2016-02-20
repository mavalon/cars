'use strict';
let env = require('../config/env');
let mongoose = require('mongoose');
let jsonfile = require('jsonfile');
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

    importModels(req, res) {
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

        const params = req.params;
        const filters = {_id: params.id};
        Vehicles.find(filters).exec((err, result) => {
            res.send(result);
        });
    }
};
