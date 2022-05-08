'use strict';
const db = require('../models');

const set = (model, entity) => {
     if (model.name) {
          entity.name = model.name;
     }

     return entity;
};

const getById = async (id) => {
     return await db.user.findById(id);
};

exports.create = async (model) => {
     let entity = new db.user({
          name: model.name,
     });
     return await entity.save();
};

exports.update = async (id, model) => {
     let entity = await db.user.findById(id);
     set(model, entity);
     return entity.save();
};

exports.search = async (query, page) => {
     const items = await db.user.find({
          where: query,
     });
     return {
          items: items,
          count: items.length,
     };
};

exports.get = async (query) => {
     if (typeof query === 'string') {
          if (query.isObjectId()) {
               return getById(query);
          }
     }
     if (query.id) {
          return getById(query.id);
     }
     return null;
};

exports.remove = async (id) => {
     let entity = await this.get(id);

     if (entity) {
          return await entity.destroy();
     }
     return null;
};
