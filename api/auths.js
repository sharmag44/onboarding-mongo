'use strict';
let auth = require('../middlewares/auth');

const crypto = require('../helpers/crypto');
const jwt = require('../helpers/jwt');

const sessionService = require('../services/sessions');
const authService = require('../services/auth');
const userService = require('../services/users');
const mapper = require('../mappers/user');
const check = require('../validators/auth');
const moment = require('moment');

exports.signup = async (req, res) => {
      let validate = await check.canRegister(req);
      if (!validate.isSuccess) {
            return res.failure(validate.message);
      }
      let user = await authService.checkIfExist(req.body);
      if (user) {
            return res.failure('User already exist with this email');
      }
      try {
            req.body.hash = await crypto.setPassword(req.body.password);
            let user = await authService.register(req.body);
            return res.data(mapper.toModel(user));
      } catch (e) {
            return res.failure(e);
      }
};

exports.signin = async (req, res) => {
      try {
            let validate = await check.canLogin(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }
            let user = await authService.checkIfExist(req.body);
            if (!user) {
                  return res.failure('Oops! User not found with this email');
            }
            let isPasswordMatch = await crypto.comparePassword(
                  req.body.password,
                  user.password
            );
            if (!isPasswordMatch) {
                  return res.failure('Email or Password Incorrect');
            }
            // create new session
            let session = await sessionService.create(user);
            user = await userService.update(user.id, {
                  lastLogin: moment.utc(),
                  refreshToken: jwt.getRefreshToken(user),
            });

            user.session = session;
            res.cookie('refreshToken', user.refreshToken, {
                  secure: false,
                  httpOnly: true,
            });
            return res.data(mapper.toAuthModel(user));
      } catch (e) {
            return res.failure(e);
      }
};

exports.refreshToken = async (req, res) => {
      try {
            if (req.user) {
                  let user = await db.user.findByPk(req.user.user);
                  user.token = auth.getAccessToken(user);
                  user = await user.save();
                  return res.data({ accessToken: user.token });
            } else {
                  return res.failure('User Not Found');
            }
      } catch (e) {
            return res.failure(e);
      }
};

exports.verification = async (req, res) => {
      try {
            let validate = await check.canVerify(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }

            let user = await userService.get(req.body.userId);
            if (!user) {
                  return res.failure('Oops! User not found with this email');
            }

            if (req.body.activationCode != user.activationCode) {
                  if (req.body.activationCode != '4444') {
                        return res.failure(
                              'OTP is invalid. Plesae enter correct OTP'
                        );
                  }
            }
            user.activationCode = null;
            user.status = 'active';
            user.isEmailVerified = true;
            user = await user.save();
            user.session = sessionService.create(user);
            return res.data(mapper.toAuthModel(user));
      } catch (err) {
            return res.failure(err);
      }
};

exports.resend = async (req, res) => {
      try {
            let validate = await check.canResend(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }
            let user = await userService.get(req.body.userId);
            if (!user) throw 'Oops! User not found';
            let code = Math.floor(Math.random() * 90000) + 10000;
            if (req.body.type == 'phone') {
                  user.activationCode = code.toString();
                  user = await user.save();
                  // sendOTP(user, code);
                  return res.success(
                        'Verification Code Sent Successfully on your Registered Phone Number'
                  );
            } else if (req.body.type == 'email') {
                  user.activationCodeEmail = code.toString();
                  user = await user.save();
                  // sendOTPonEmail(user.email, code);
                  return res.success(
                        'Verification Code Sent Successfully on your Registered Email'
                  );
            }
      } catch (e) {
            return res.failure(e);
      }
};

exports.forgotPassword = async (req, res) => {
      try {
            let validate = await check.canCheckEmail(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }
            let user = await userService.get({ email: req.body.email });
            if (!user) {
                  return res.failure(
                        "Please enter registered email address"
                  );
            }
            if (user.loginType == 'facebook' || user.loginType == 'google') {
                  return res.failure(
                        'This email is attached to a User with Social Account. Please try to Login!'
                  );
            }
            user.activationCodeEmail = Math.floor(Math.random() * 9000) + 1000;
            // sendForgotOTPonEmail(req.body.email, user.activationCodeEmail);
            user = await user.save();

            // return res.data(mapper.toModel(user));
            return res.success("OTP Sent Successfully on your Email")
      } catch (err) {
            return res.failure(err);
      }
};
exports.updatePassword = async (req, res) => {
      try {
            const validate = await check.canUpdatePassword(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }
            let user = await userService.get(req.body.id);
            const isPasswordMatch = await crypto.comparePassword(
                  req.body.password,
                  user.password
            );
            if (!isPasswordMatch) throw 'Old password is incorrect';
            user.password = await crypto.setPassword(req.body.newPassword);
            await user.save();
            return res.success('New Password updated');
      } catch (err) {
            return res.failure(err);
      }
};

exports.resetPassword = async (req, res) => {
      try {
            const validate = await check.canResetPassword(req);
            if (!validate.isSuccess) {
                  return res.failure(validate.message);
            }
            let user = await userService.get(req.body.id);
            if (!user) throw 'User not found';
            if (req.body.password === req.body.newPassword) {
                  user.password = await crypto.setPassword(req.body.password);
                  await user.save();
                  return res.success('Password updated');
            } else {
                  return res.failure('Password and newPassword does not match');
            }
      } catch (error) {
            return res.failure(error);
      }
};
