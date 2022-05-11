const Product = require("../models/Product")
const OrderDetail = require("../models/OrderDetail")
class ProductController {

    //[GET]
    async getProductById(req, res, next) {
        const id = req.params.id;
        const product = await Product.findById(id).populate("colorId").populate('categoryId');
        if(product)
        {
            return res.status(200).json({
                message: "OK",
                product
            })
        }
        else {
            return res.status(400).json({
                message: "Not found"
            })
        }
    }
    //[GET]
    getProducts(req, res, next) {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Product.find().skip((perPage * page) - perPage).limit(perPage).populate('categoryId').exec((err, products) => {
            Product.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    products,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    //[GET]
    getProductsByCategory(req, res, next)
    {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        let categoryId = req.params.categoryId;
        Product.find({ categoryId }).skip((perPage * page) - perPage).limit(perPage).populate('categoryId').exec((err, products) => {
            Product.countDocuments({ categoryId }, (err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    products,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    //[POST]
    async create(req, res, next){
        const file = req.file;
        let image;
        console.log(file);
        console.log(req.body);
        if(file)
        {
            image = file.filename
        }
        else {
            image = '';
        }
        const {nameProduct, prices, stock, categoryId, colorId, description } = req.body;
        try{
            await Product.create({ nameProduct, prices, stock, categoryId, productImage : image, colorId, description })
            return res.status(201).json({
                message : "Create product successfully"
            })
        }
        catch(err) {
            return res.status(400).json({
                message : err
            })
        }
    }

    //[PUT]
    async update(req, res, next){
        const {id, nameProduct, prices, stock, categoryId, colorId, description} = req.body;
        console.log(stock);
        const file = req.file;
        if(file)
        {
            try {
                const product = await Product.findOneAndUpdate({ _id : id}, {
                    nameProduct,
                    prices,
                    stock,
                    categoryId,
                    colorId, 
                    description,
                    productImage : file.filename
                }, { new : true }).populate("categoryId")

                return res.status(200).json({
                    message : "Update product successfully",
                    product
                })
            } catch (err) {
                return res.status(400).json({
                    message : err
                })
            }
            
        }
        else {
            try {
                const product = await Product.findOneAndUpdate({ _id : id}, {
                    nameProduct,
                    prices,
                    stock,
                    categoryId,
                    colorId, 
                    description
                }, { new : true })
                return res.status(200).json({
                    message : "Update product successfully",
                    product
                })
            } catch (err) {
                return res.status(400).json({
                    message : err
                })
            }
        }

    }

    //[delete]
    async delete(req, res, next) {
        const { productId } = req.body;
        const orderDetail = await OrderDetail.findOne({ productId })
        if(orderDetail)
        { 
            return res.status(400).json({
                message : "Can't delete this product"
            })
        }
        else {
            try{
                await Product.deleteOne({ _id: productId })  
                return res.status(200).json({
                    message : "Delete successfully"
                })
            }
            catch(err){
                return res.status(500).json({
                    error : err
                })
            }
            
            
        }
    }
}

module.exports = new ProductController();