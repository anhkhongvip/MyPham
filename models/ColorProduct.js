const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorProductSchema = new Schema({
    nameColor: {
        type: String,
        required: true,
    },
    codeColor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const ColorProduct = mongoose.model("ColorProduct", ColorProductSchema);
module.exports = ColorProduct;