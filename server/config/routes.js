'use strict';

//let vehicles = require('../controllers/vehicles');
let express = require('express');
let vehicles = require('../models/vehicles');
let index = require('../controllers');

module.exports = app => {
    app.use(express.static('public'));

    app.get('/api/years', vehicles.getDistinctYears); // vehicles.getAllYears);

    app.get('/api/models/:year/?', vehicles.getModelsForYear); // vehicles.getYearModels);

    app.get('/api/trims/:model/?', vehicles.getModelTrims); // vehicles.getModelTrims);

    app.get('/api/models/?', vehicles.getAllModels);

    app.get('/api/model/:id/?', vehicles.getModel);

    app.get('/api/import/models', vehicles.importModels);

    app.post('/api/import/specs', vehicles.postSpecs);

    app.get('/api/specs/:filename', vehicles.getSpecifications);

    app.get('*', index);
};
