const Product = require("../models/Product");
class FilterController {
    async filterCategories(req, res, next)
    {
        let perPage = 2; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Product.find({ categoryId: { $in: req.body.filterCategory}}).skip((perPage * page) - perPage).limit(perPage).populate('categoryId').exec((err, products) => {
            Product.countDocuments({ categoryId: { $in: req.body.filterCategory}}, (err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    products,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }
}

module.exports = new FilterController();