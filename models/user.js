const mongoose = require('mongoose');

module.exports = {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    refreshToken: { type: String, default: null },
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },
    appleId: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false},
    emailVerfiicationCode: { type: String, default: null},
    phoneVerfiicationCode: { type: String, default: null},
    status: { type: String, default: 'pending' },
     
};
