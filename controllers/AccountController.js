const User = require("../models/User");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
class AccountController {

  //[POST] register
  async register(req, res, next) {
    const { username, phoneNumber, email, password } = req.body;
    const foundEmail = await Account.findOne({ email });
    if (foundEmail)
      return res.status(403).json({
        error: [{ key: "email", err: " Email này đã được sử dụng " }],
    });
    
    const user = await User.create({
      userName: username,
      phoneNumber,
    });

    await Account.create({
      email,
      password,
      userId: user._id,
    });

    req.session.userId = user._id;

    return res.status(200).json({
      message: "OK"
    })
  }

  //[POST]
  async login(req, res, next) {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (account) {
      bcrypt.compare(password, account.password, async (error, same) => {
        if (same) {
          // if passwords match
          const user = await User.findById(account.userId);
          req.session.userId = user._id;
          return res.status(200).json({ message: "OK", account });
        } else {
          return res.status(400).json({
            error: [{ message: "error", err: "Email hoặc mật khẩu không chính xác" }],
          });
        }
      });
    } else {
      return res.status(400).json({
        error: [{ key: "password", err: " Email hoặc mật khẩu không chính xác" }],
      });
    }
  }

  logout(req, res, next) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
}

module.exports = new AccountController();
