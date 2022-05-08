'use strict';
const db = require('../models');
const number = require('../helpers/number');

exports.checkIfExist = async (model) => {
      var where = {
            email: model.email
      };
      return await db.user.findOne(where);
};

exports.register = async (model) => {
      let entity = new db.user({
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            password: model.hash,
            phone:model.phone,
            activationCode: number.randomPin(),
      });
      return await entity.save();
};
