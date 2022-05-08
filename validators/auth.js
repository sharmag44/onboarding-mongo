'use strict';
exports.canRegister = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.firstName) {
            data.message = 'firstName required';
            return data;
      }
      if (!req.body.lastName) {
            data.message = 'lastName required';
            return data;
      }
      if (!req.body.email) {
            data.message = 'email required';
            return data;
      }
      if (!req.body.password) {
            data.message = 'password required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canLogin = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.email) {
            data.message = 'email required';
            return data;
      }
      if (!req.body.password) {
            data.message = 'password required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canVerify = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.userId) {
            data.message = 'userId required';
            return data;
      }
      if (!req.body.activationCode) {
            data.message = 'activationCode required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canCheckEmail = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.email) {
            data.message = 'email required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canResend = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.userId) {
            data.message = 'userId required';
            return data;
      }
      if (!req.body.type) {
            data.message = 'type required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canUpdatePassword = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }

      if (req.body.id) {
            data.message = 'userId not required';
      }
      if (!req.body.password) {
            data.message = 'password required';
            return data;
      }
      if (!req.body.newPassword) {
            data.message = 'newpassword required';
            return data;
      }
      data.isSuccess = true;
      return data;
};

exports.canResetPassword = async (req) => {
      let data = {
            isSuccess: false,
      };
      if (!req.body) {
            data.message = 'invalid request';
            return data;
      }
      if (!req.body.password) {
            data.message = 'password required';
            return data;
      }
      if (!req.body.newPassword) {
            data.message = 'newPassword required';
            return data;
      }
      data.isSuccess = true;
      return data;
};
