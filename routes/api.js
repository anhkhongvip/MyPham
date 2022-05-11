const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")
const CategoryController = require("../controllers/CategoryController")
const ColorProductController = require("../controllers/ColorProductController")
const ProductController = require("../controllers/ProductController")
const OrderController = require("../controllers/OrderController")
const CheckoutController = require("../controllers/CheckoutController")
const FilterController = require("../controllers/FilterController")

//Middleware @s
const upload = require('../middlewares/uploadMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
//Middleware @e


router.route("/getUser").get(UserController.getUser);

//[api/users/:page]
router.route("/admin/users/:page").get(UserController.getListUser)

//[api/users/:id]
router.route("/admin/users/:id").put(UserController.updateUserAdmin)

//[api/categories]
router.route("/categories")
    .get(CategoryController.getAllCategories)
    .post(CategoryController.create)
    .put(CategoryController.update)
    .delete(CategoryController.delete)


//[api/colorProducts/:page]
router.route("/colorProducts/:page")
    .get(ColorProductController.getAllColor)

//[api/colorProducts]
router.route("/colorProducts")
    .post(ColorProductController.create)
    .put(ColorProductController.update)
    .delete(ColorProductController.delete)

// route [api/products/:page]
router.route('/products/:page').get(ProductController.getProducts) // lấy tất cả ko cần phụ thuộc category

// route [api/products]
router.route('/products')
    .post(upload.single('image'), ProductController.create)
    .put(upload.single('image'), ProductController.update)
    .delete(ProductController.delete)

// route [api/products/:id]
router.route('/product/:id')
    .get(ProductController.getProductById)    
    
// route [api/:categoryId/products/:page]
router.route('/:categoryId/products/:page').get(ProductController.getProductsByCategory)

// route [api/checkout]
router.route('/checkout').post(CheckoutController.order)

// route [api/orders/:page]
router.route('/orders/:page').get(OrderController.getOrderList)

// route [api/ordersByUser/:page]
router.route('/ordersByUser/:page').get(authMiddleware, OrderController.getOrderByUser);

// route [api/transaction/:orderId]
router.route('/transaction/:orderId').post(CheckoutController.transaction)

// route [api/orderCancel/:orderId]
router.route('/orderCancel/:orderId').put(OrderController.cancelOrder);

//route [api/filter]
router.route('/filter/:page').post(FilterController.filterCategories)



module.exports = router;