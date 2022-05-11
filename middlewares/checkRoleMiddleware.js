const Account = require('../models/Account')
module.exports = async (req, res, next) => {
    console.log(req.userId);
    const account = await Account.findOne({userId: req.session.userId});
    if(account.isAdmin)
    {
        next()
    }
    else {
        res.redirect("..")
    }
}