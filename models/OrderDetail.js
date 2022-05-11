const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    nameProduct: {
        type: String
    },
    quantity:{
        type: Number,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductDetail'
    },
    price: {
        type: Number,
        required: true,
    },
    totalMoney: {
        type: Number,
    }
});

const OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);
module.exports = OrderDetail;