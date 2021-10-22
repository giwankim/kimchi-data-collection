const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  postcode: { type: String },
  address: { type: String, required: true },
  detail_address: { type: String, required: true },
  cuisine: {
    type: String,
    required: true,
    enum: ["한식", "양식", "중식", "일식", "분식", "기타"],
  },
  brand: { type: String, required: true },
  area: { type: Schema.Types.Decimal128, required: true },
  consumption: { type: Schema.Types.Decimal128, required: true },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
