'use strict'
const db = require('../models')
const jwt = require('../helpers/jwt')

const include = [{ 
    model: db.user, 
    include: [{ 
        model: db.role
    }]
}]

exports.create = async (user) => {
    let entity = new db.session({
        userId: user.id
    })
    entity = await entity.save()
    let accessToken = jwt.getAccessToken(user, entity);
    entity.accessToken = accessToken;
    return entity.save();
}

exports.get = async (id) => {
    return await db.session.findOne({
        where: {
            id: id 
        }, 
        include : include
    })
}