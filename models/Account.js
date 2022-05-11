const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.pre("save", async function (next) {
  try{
    //Generate a salt
    const salt = await bcrypt.genSalt(10)
    //Generate a password hash(salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt)
    this.password = passwordHashed
  }
  catch(err) {
    next(err);
  }
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;