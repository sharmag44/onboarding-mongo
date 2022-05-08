'use strict';
var bcrypt = require('bcryptjs');

exports.setPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}