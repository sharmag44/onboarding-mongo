'use strict';
const jwt = require('jsonwebtoken')
const authConfig = require('config').get('authConfig')
const sessionService = require('../services/sessions')

const db = require('../models');

exports.validateToken = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'token is required.'
        });
    }

    try {
        let claims = jwt.verify(token, authConfig.secret)
        let session = await sessionService.get(claims.session)
        
        if (!session) {
            return res.status(403).send({
                success: false,
                message: 'session not found'
            });
        }
        if (session.user && session.user.status == 'inactive') {
            return res.status(403).send({
                success: false,
                message: 'user inactive.'
            });
        }

        req.session = session;
        req.user = session.user;
        req.role = session.user ? session.user.role : null

        if (req.user && req.user.role) {
            var hasPermisssions = await db.rolePermission.findAll({ where: { roleId: req.role.id }, include: [db.permission] });

            let retVal = _.rest(req.originalUrl.split('/'), 2);

            let permissonToCheck = retVal[0];
            let permissonToChecks = permissonToCheck.split("?", 2);
            let permissonToCheck1 = permissonToChecks[0];
            var hasEntry = _.find(hasPermisssions, (hasPermission) => {
                return hasPermission.permission.entityName === permissonToCheck1;
            });
            if(!hasEntry){
                return res.status(403).send({
                    success: false,
                    message: 'permission not added.'
                });
            }
            switch (req.method) {
                case 'POST':
                    if (!hasEntry.create) {
                        return res.status(403).send({
                            success: false,
                            message: 'access forbidden.'
                        });
                    }
                    break;
                case 'GET':
                    if (!hasEntry.read) {
                        return res.status(403).send({
                            success: false,
                            message: 'access forbidden.'
                        });
                    }
                    break;
                case 'PUT':
                    if (!hasEntry.edit) {
                        return res.status(403).send({
                            success: false,
                            message: 'access forbidden.'
                        });
                    }
                    break;
                case 'DELETE':
                    if (!hasEntry.delete) {
                        return res.status(403).send({
                            success: false,
                            message: 'access forbidden.'
                        });
                    }
                    break;
            }
        }
        next();

    } catch (err){
        if (err.name === 'TokenExpiredError'){
            return res.failure("Session Expired");
        }
        return res.failure(err);
    }
}

exports.validateTokenOptional = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token)
        return validateToken(req, res, next);

    req.user = null;
    next();
};

exports.validateRefreshToken = (req, res, next) => {
    var refreshToken = req.cookies.refreshToken || req.headers['refreshToken'];

    if (!refreshToken) {
        return res.status(403).send({
            success: false,
            message: 'refreshToken is required.'
        });
    }

    jwt.verify(refreshToken, authConfig.refreshSecret, function(err, claims) {
        if (err) {
            return res.status(403).send({
                success: false,
                message: err
            });
        }
        req.user = claims;
        next();
    });
}


