const base = require('./api-base')('users', 'user')
const check = require('../validators/users');

exports.create = async (req, res) => {
    try{
        let validate = await check.canCreate(req);
        if (!validate.isSuccess) {
            return res.failure(validate.message);
        }
        let retVal = await base.create(req);
        return res.data(retVal);
    } catch(error){
          res.failure(error)
    }
};

exports.update = async (req, res) => {
    let validate = await check.canUpdate(req);
    if (!validate.isSuccess) {
          return res.failure(validate.message);
    }

    let retVal = await base.update(req);
    return res.data(retVal);
};

exports.search = async (req, res) => {
try
   {
    let retVal = await base.search(req);
    return res.pageWithPaging(retVal.items, retVal.pageNo, retVal.limit, retVal.total);
    }
    catch(err){
   res.failure(err);
    }
};

exports.get = async (req, res) => {
    let retVal = await base.get(req)
    return res.data(retVal);
}
