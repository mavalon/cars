'use strict';

let express = require('express');
let vehicles = require('../controllers/vehicles');
let index = require('../controllers');

module.exports = app => {
    app.use(express.static('public'));

    app.get('/api/years', vehicles.getAllYears);

    app.get('/api/models/:year/?', vehicles.getYearModels);

    app.get('/api/trims/:year/:model/?', vehicles.getModelTrims);

    app.get('*', index);
};
