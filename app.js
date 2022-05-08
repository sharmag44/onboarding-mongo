exports.configure = (app) => {
  try {
    require('./helpers/string')
    require('./settings/database').configure(app);
    require('./settings/routes').configure(app);
  }
  catch(err){
    console.log(err);
  }
}


