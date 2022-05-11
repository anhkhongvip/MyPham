const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");
const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

const paypalClient = new paypal.core.PayPalHttpClient(environment);

class CheckOutController {
  async order(req, res, next) {
    const { order, orderDetails } = req.body;

    const orderCreate = await Order.create({
      fullname: order.fullname,
      email: order.email,
      address: order.address,
      phone_number: order.phone_number,
      total_money: order.total_money,
    });

    for (let i = 0; i < orderDetails.length; i++) {
      await OrderDetail.create({
        orderId: orderCreate._id,
        productId: orderDetails[i].product_id,
        nameProduct: orderDetails[i].nameProduct,
        quantity: orderDetails[i].quantity,
        price: orderDetails[i].price,
        totalMoney: orderDetails[i].totalMoney,
      });
    }

    return res.status(200).json({
      orderCreate
    })
  }

  async transaction(req, res, next) {
    let orderId = req.params.orderId;
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    const request = new paypal.orders.OrdersCreateRequest();
    const order = await Order.findById(orderId);
    const orderDetails = await OrderDetail.find({ orderId });
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.total_money,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: order.total_money,
              },
            },
          },
          items: orderDetails.map((item) => {
            return {
              name: item.nameProduct,
              unit_amount: {
                currency_code: "USD",
                value: item.price,
              },
              quantity: item.quantity,
            };
          }),
        },
      ],
    });

    try {
      const createOrder = await paypalClient.execute(request);
      res.json({ id: createOrder.result.id })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
  }

}


module.exports = new CheckOutController();
