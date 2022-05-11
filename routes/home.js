const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkStatusOrderMiddleware = require("../middlewares/checkStatusOrderMiddleware");
const isLoginMiddleware = require("../middlewares/isLoginMiddleware");
router.route("/").get(HomeController.index);

router.route("/shop").get(HomeController.shop);

router.route("/register").get(isLoginMiddleware, HomeController.register)

router.route("/login").get(isLoginMiddleware, HomeController.login)

router.route("/cart").get(HomeController.cart);

router.route("/trackingOrder").get(authMiddleware, HomeController.trackingOrder);

router.route("/checkout").get(authMiddleware, HomeController.checkout);

router.route("/payment/:orderId").get(authMiddleware, checkStatusOrderMiddleware, HomeController.payment);

router.route("/thankyou/:orderId").get(HomeController.thankyou);

module.exports = router;