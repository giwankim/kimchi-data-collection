const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true },
  postcode: { type: String },
  address: { type: String, required: true },
  detail_address: { type: String },
  production: { type: Schema.Types.Decimal128, required: true },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: { type: String, required: true, default: "제조업체" },
});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

module.exports = Manufacturer;
