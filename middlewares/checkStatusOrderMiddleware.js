const mongoose = require("mongoose");
const Order = require("../models/Order");
module.exports = async (req, res, next) => {
    let orderId = req.params.orderId;
    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        res.redirect("..");
    } 
    else {
        const order = await Order.findById(orderId);
        if(order) {
            if(order.status !== "1")
            {
                res.redirect("..");
            }
            else{
                next();
            }
        }
        else {
            res.redirect("..");
        }
    }
}