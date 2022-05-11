const User = require('../models/User')
const Account = require('../models/Account')
class UserController {
    async getUser(req, res, next) 
    {
        const id = req.session.userId;
        console.log(id);
        const user = await User.findById(id);
        if(user) {
            return res.status(200).json({
                message: 'OK',
                user,
            })
        }
        else {
            return res.status(200).json({
                message: 'Notfound'
            })
        }
    }

    async updateUserAdmin(req, res, next){
        const account_id = req.params.id;
        const { username, phone_number, isAdmin } = req.body;
        const account = await Account.findOneAndUpdate({_id: account_id}, {
            isAdmin
        }, {new : true});

        const user = await User.findOneAndUpdate({_id: account.userId }, {
            userName : username,
            phoneNumber : phone_number
        }, {new : true})
        return res.status(200).json({
            message: "Update successfully",
            account,
            user
        })
    }

    //[GET]
    getListUser(req, res, next){
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Account.find().skip((perPage * page) - perPage).limit(perPage).populate('userId').exec((err, accounts) => {
            Account.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    accounts,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }
}

module.exports = new UserController();