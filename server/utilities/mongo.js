'use strict';

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/hyundai';

module.exports = {

    connect(cb) {
        MongoClient.connect(url, (err, db) => {
            cb(db);
        });
    },

    insertDocuments(col, data, cb) {
        return this.connect((db) => {
            let collection = db.collection(col);
            collection.insertMany(data, (err, result) => {
                db.close();
                return cb(err, result);
            });
        });
    },

    getDistinctValues(col, type, cb) {
        return this.connect((db) => {
            let collection = db.collection(col);
            collection.distinct(type, (err, results) => {
                db.close();
                return cb(err, results);
            });
        });
    },

    filterAndSort(collection, filterOptions, sorting, cb) {
        return this.connect((db) => {
            let col = db.collection(collection);
            col.find(filterOptions, {sort: [sorting]}).toArray((err, results) => {
                db.close();
                return cb(err, results);
            });
        });
    }
};
