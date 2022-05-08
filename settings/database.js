'use strict';
const dbConfig = require('config').get('mongodb');
var mongoose = require('mongoose');

module.exports.configure = () => {
     mongoose.Promise = global.Promise;

     let connect = function () {
          let config = JSON.parse(JSON.stringify(dbConfig));

          if (config.options) {
               config.options.promiseLibrary = global.Promise;
          }

          console.log('connecting to', dbConfig);
          mongoose.connect(config.host, config.options);
     };
     connect();

     let db = mongoose.connection;

     db.on('connected', function () {
          console.log('mongo Connected');
     });

     db.on('error', function (err) {
          console.logr('connection error: ' + err);
     });

     db.on('disconnected', function () {
          console.log('connecting again');
          connect();
     });

     global.db = require('../models');
     return global.db;
};
