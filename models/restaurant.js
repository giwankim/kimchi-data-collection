const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  _record_type: { type: String, required: true },
  _schema_version: { type: String, required: true },
  type_of_kimchi: {
    type: String,
    required: true,
    enum: ["self_made", "purchased"],
  },
  composition: {
    type: String,
    required: true,
    enum: ["korean_ingredients", "domestic"],
  },
  consumption_amount: { type: Schema.Types.Decimal128, required: true },
  province: { type: String },
  district: { type: String },
  address: { type: String, required: true },
  address_detail: { type: String },
  postal_code: { type: String },
  name: { type: String, required: true },
  area: { type: Schema.Types.Decimal128, required: true },
  cuisine: {
    type: String,
    required: true,
    enum: ["korean", "chinese", "japanese", "snack", "other"],
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
