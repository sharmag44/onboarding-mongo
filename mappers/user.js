'use strict';
const crypto = require('../helpers/crypto');

exports.toModel = (entity) => {
    const model = {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        phone: entity.phone,
        imgUrl: entity.imgUrl,
        isEmailVerified: entity.isEmailVerified,
        isPhoneVerified: entity.isPhoneVerified,
        status: entity.status
    }
    return model;
};

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}

exports.toAuthModel = (entity) => {
    let model = this.toModel(entity);
    if (entity.session) {
        model.accessToken = entity.session.accessToken;
    }
    return model;
};

exports.newEntity = async (body) => {
    const model = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        imgUrl: body.imgUrl
    }
    if (body.password) {
        model.password = await crypto.setPassword(body.password);
    }
    // user created by admin
    model.isEmailVerified = true;
    model.status = 'active';
    return model;
}