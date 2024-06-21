const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const ParcelSchema = new Schema({
  parcel_num: {
    type: Number,
    unique: true,
  },
  parcel_desc: {
    type: String,
    required: true,
  },
  parcel_status: {
    type: String,
    enum: ["In Charge", "In Progress", "Delivered"],
    required: true,
  },
  parcel_type: {
    type: String,
    enum: [
      "Standard",
      "Oversized",
      "Heavy",
      "Fragile",
      "Perishable",
      "Hazardous",
      "Valuable",
      "Express",
      "Return",
    ],
    required: true,
  },
  exp_name: {
    type: String,
    required: true,
  },
  exp_tel: {
    type: String,
    required: true,
  },
  exp_email: {
    type: String,
  },
  exp_address: {
    type: String,
    required: true,
  },
  dest_name: {
    type: String,
    required: true,
  },
  dest_tel: {
    type: String,
    required: true,
  },
  dest_email: {
    type: String,
  },
  dest_address: {
    type: String,
    required: true,
  },
  courser_name: {
    type: String,
    required: true,
  },
  courser_tel: {
    type: String,
    required: true,
  },
  courser_email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

ParcelSchema.plugin(autoIncrement, { inc_field: "parcel_num" });

module.exports = mongoose.model("Parcel", ParcelSchema);
