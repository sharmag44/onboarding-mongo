'use strict';
const apiRoutes = require('../helpers/apiRoute');
var auth = require('../middlewares/auth');

module.exports.configure = (app) => {
     app.get('/', (req, res) => {
          res.render('index', {
               title: 'Sample API',
          });
     });
     app.get('/api', (req, res) => {
          res.render('index', {
               title: 'Sample API',
          });
     });

     let api = apiRoutes(app);


     api.model('users').register([
        {
              action: 'POST',
              method: 'create'
        },{
              action: 'PUT',
              method: 'update',
              url: '/:id',
        },{ 
              action: 'GET',
              method: 'get',
              url: '/:id',
              filter: auth.validateToken,
        },{
              action: 'GET',
              method: 'search',
              filter: auth.validateToken,
        }
  ]);

  api.model('auths').register([
        {
              action: 'POST',
              method: 'signup',
              url: '/signup',
        },
        {
              action: 'POST',
              method: 'signin',
              url: '/signin',
        },
        {
              action: 'POST',
              method: 'refreshToken',
              url: '/refresh-token',
              filter: auth.validateRefreshToken,
        },
        {
              action: 'POST',
              method: 'verification',
              url: '/verify',
        },
        {
            action: 'POST',
            method: 'resend',
            url: '/resend',
            filter: auth.validateRefreshTokenOptional,
       },
        {
              action: 'POST',
              method: 'forgotPassword',
              url: '/forgotPassword',
              filter: auth.validateRefreshTokenOptional,
        },
        {
              action: 'PUT',
              method: 'updatePassword',
              url: '/updatePassword',
              filter: auth.validateRefreshTokenOptional,
        },
        {
              action: 'PUT',
              method: 'resetPassword',
              url: '/resetPassword',
              filter: auth.validateRefreshTokenOptional,
        },
  ]);
};