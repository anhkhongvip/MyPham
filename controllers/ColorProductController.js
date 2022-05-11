const Product = require("../models/Product");
const ColorProduct = require("../models/ColorProduct");
class ColorProductController {

  //[GET]
  async getAllColor(req, res, next)
  { 
    let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        ColorProduct.find().skip((perPage * page) - perPage).limit(perPage).exec((err, colorProducts) => {
          ColorProduct.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    colorProducts,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
  }

  //[POST]
  async create(req, res, next) {
    console.log(req.body);
    const { nameColor, codeColor } = req.body;
    try {
      await ColorProduct.create({ nameColor, codeColor });
      return res.status(201).json({
        message: "Create color product successfully",
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }

  //[PUT]
  async update(req, res, next) {
    const { id, nameColor, codeColor } = req.body;

    try {
      const colorProduct = await ColorProduct.findOneAndUpdate(
        { _id: id },
        { nameColor, codeColor},
        { new: true }
      );

      return res.status(200).json({
        message: "Update color product successfully",
        colorProduct,
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  }

  //[delete]
  async delete(req, res, next) {
    const { colorId } = req.body;
    const product = await Product.findOne({ colorId });
    if (product) {
      return res.status(400).json({
        message: "Không thể xóa màu này",
      });
    } else {
      try {
        await ColorProduct.deleteOne({ _id: colorId });
        return res.status(200).json({
          message: "Xóa thành công",
        });
      } catch (err) {
        return res.status(500).json({
          error: err,
        });
      }
    }
  }
}

module.exports = new ColorProductController();
