const mongoose = require("mongoose");
const Product = require("../models/Product")
const Category = require("../models/Category")
const Order  = require("../models/Order")
const OrderDetail = require("../models/OrderDetail")
const Account = require("../models/Account")
class HomeController {

    async index(req, res, next) {
        const products = await Product.find({}).limit(6)
        const categories = await Category.find({})
        res.render('home/index', { products, categories })
    }

    async shop(req, res, next){
        const categories = await Category.find({})
        let count;
        const data = categories.map(async (item) => {
                count  = await Product.count({categoryId: item._id})
                return { 
                    _id: item._id,
                    nameCategory: item.nameCategory,
                    quantity: count
                }
        })
        const categoryData = await Promise.all(data);
        res.render('home/shop', { categoryData })
    }

    async register(req, res, next) {
        res.render('home/register')
    }

    async login(req, res, next) {
        res.render('home/login')
    }

    async cart(req, res, next) {
        return res.render('home/cart/index')
    }

    async trackingOrder(req, res, next) {
        return res.render('home/trackingOrder')
    }

    async checkout(req, res, next) {
        let id = req.userId;
        const account = await Account.findOne({userId: req.session.userId});
        return res.render('home/checkout', { account })
    }

    async payment(req, res, next)
    {
        let orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        const orderDetails = await OrderDetail.find({ orderId })
        res.render('home/payment', {
            order,
            orderDetails,
            paypalClientId: `${process.env.PAYPAL_CLIENT_ID}`
        })
    }

    async thankyou(req, res, next) {
        const { orderId }  = req.params;
        const order = await Order.findById(orderId);
        if(order.status == "1")
        {
            try{
                order.status = "2";
                await order.save()
                const orderDetails = await OrderDetail.find({ orderId });
                if(orderDetails)
                {
                    orderDetails.forEach(async (item) => {
                        const product = await Product.findById(item.productId);
                        let stock = product.stock - item.quantity;
                        product.stock = stock;
                        await product.save()
                    })
                }
            }
            catch(error){
                res.status(500).json({error: error.message});
            }
        }
        
        res.render("home/thankyou")
    }
}

module.exports = new HomeController();