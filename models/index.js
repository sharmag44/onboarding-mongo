'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
const camelcase = require('camelcase');
const findOrCreate = require('findorcreate-promise');

mongoose.Promise = global.Promise;

var init = function () {
     // set all the models on db
     mongoose.plugin(findOrCreate);

     fs.readdirSync(__dirname).forEach(function (file) {
          if (file.indexOf('.js') && file.indexOf('index.js') < 0) {
               let name = file.split('.')[0];
               let entity = require('./' + file);
               entity.timeStamp = {
                    type: Date,
                    default: Date.now,
               };
               let schema = mongoose.Schema(entity, { usePushEach: true });

               schema.pre('save', function (next) {
                    this.timeStamp = Date.now();
                    next();
               });

               mongoose.model(camelcase(name), schema);
          }
     });
};

init();

module.exports = mongoose.models;
