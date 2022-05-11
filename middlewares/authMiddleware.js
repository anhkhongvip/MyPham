const Account =  require('../models/Account')
module.exports = async (req, res, next) => {
    const account = await Account.findOne({ userId: req.session.userId})
    if(account)
    {
        next()
    }
    else {
        res.redirect("/login")
    }
}