'use strict'
exports.canCreate = async (req) => {
    let data = {
        isSuccess: false
    };
    if (!req.body) {
        data.message = 'invalid request'
        return data;
    }
    if (!req.body.firstName) {
        data.message = 'firstName is required' 
        return data;
    }
    if (!req.body.lastName) {
        data.message = 'lastName is required' 
        return data;
    }
    if (!req.body.email) {
        data.message = 'email is required' 
        return data;
    }
    if (!req.body.password) {
        data.message = 'password is required' 
        return data;
    }
    if (!req.body.phone) {
        data.message = 'phone is required' 
        return data;
    }
    
    
    
    data.isSuccess = true
    return data;
}

exports.canUpdate = async (req) => {
    let data = {
        isSuccess: false
    };
    if (!req.body) {
        data.message = 'invalid request'
        return data;
    }
    
    data.isSuccess = true
    return data;
}

