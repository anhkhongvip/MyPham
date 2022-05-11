const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController")

//Middleware @s
const authMiddleware = require("../middlewares/authMiddleware")
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware")
//Middleware @e


router.route("/users").get(authMiddleware, checkRoleMiddleware, AdminController.users);

//category
router.route("/categories").get(authMiddleware, checkRoleMiddleware, AdminController.categories);

//color product
router.route("/colorProducts").get(authMiddleware, checkRoleMiddleware, AdminController.colorProducts);

//products 
router.route("/products").get(authMiddleware, checkRoleMiddleware, AdminController.products);

//products by category
router.route("/:categoryId/products").get(authMiddleware, checkRoleMiddleware, AdminController.productsByCategory);

//invoice 
router.route("/invoice").get(authMiddleware, checkRoleMiddleware, AdminController.invoice)

router.route("/invoice/:orderId").get(authMiddleware, checkRoleMiddleware, AdminController.invoiceDetails)

module.exports = router;