const Category = require('../models/Category')
const Product = require('../models/Product')
class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const category = await Category.find({});

            if(category)
            {
                return res.status(200).json({
                    message: "GET Successfully",
                    category
                })
            }
            
        }
        catch (err) {
            return res.status(400).json({
                message: "Get fail",
                err
            })
        }
    }
    //[POST]
    async create(req, res, next) {
        const { nameCategory} = req.body;
        try{
            const category = await Category.create({ nameCategory});
            return res.status(201).json({
                message: "Created Successfully",
                category
            })
        }
        catch(err) {
            return res.status(400).json({
                message: "Create fail",
                err
            })
        }
        
    }

    //[PUT]
    async update(req, res, next) {
        const { id, nameCategory, brand } = req.body;
        const category = await Category.findOneAndUpdate({ _id : id}, {
            nameCategory,
            brand
        }, { new : true });
        
        if(category)
        {
            return res.status(200).json({
                message: "Updated successfully",
                category
            })
        }
        else {
            return res.status(400).json({
                message: "Updated fail"
            })
        }
    }

    //[Delete]
    async delete(req, res, next) {
        const { categoryId } = req.body;
        const product = await Product.findOne({ categoryId })
        if(product)
        { 
            return res.status(400).json({
                message : "Can't delete this product"
            })
        }
        else {
            try{
                await Category.deleteOne({ _id: categoryId })  
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

module.exports = new CategoryController();