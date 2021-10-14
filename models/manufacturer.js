const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  _record_type: { type: String, required: true },
  _schema_version: { type: String, required: true },
  composition: {
    type: String,
    required: true,
    enum: ["korean_ingredients", "domestic"],
  },
  production_amount: { type: Schema.Types.Decimal128, required: true },
  province: { type: String },
  district: { type: String },
  address: { type: String, required: true },
  address_detail: { type: String },
  postal_code: { type: String },
  name: { type: String, required: true },
});

ManufacturerSchema.virtual("display_address").get(() => {});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

exports.module = Manufacturer;
