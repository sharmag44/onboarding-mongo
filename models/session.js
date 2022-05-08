const mongoose = require('mongoose');
module.exports = {
    accessToken: { type: String, default: null },
    fcmToken: { type: String, default: null },
    deviceType: { type: String, default: null },
    email: { type: String, default: null },
    deviceId: { type: String, default: null }  
};

