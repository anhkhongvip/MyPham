const Order = require("../models/Order")
const Account = require("../models/Account")
class OrderController {

    async getOrderList(req, res, next) {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Order.find().sort({createdAt : -1}).skip((perPage * page) - perPage).limit(perPage).exec((err, orders) => {
            Order.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    count,
                    orders,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    async cancelOrder(req, res, next)
    { 
        const orderId = req.params.orderId;
        const order = await Order.findOneAndUpdate({ _id: orderId },{
            status: "0"
        }, {new : true});
        return res.status(200).json({
            message: "OK", 
            order
        })
    }

    async getOrderByUser(req, res, next) {
        const account = await Account.findOne({userId :req.session.userId})
        let perPage = 4; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Order.find({ email: account.email }).sort({createdAt : -1}).skip((perPage * page) - perPage).limit(perPage).exec((err, orders) => {
            Order.countDocuments({ email: account.email }, (err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    count,
                    orders,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }
}

module.exports = new OrderController();