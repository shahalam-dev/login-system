const mongoose = require("mongoose");
const mongooseIntlPhoneNumber = require("mongoose-intl-phone-number");

const loginSystemSchema = new mongoose.Schema({
  user_cell_number: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: false,
  },
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  otp: {
    type: String,
    required: true,
  },
});

loginSystemSchema.plugin(mongooseIntlPhoneNumber, {
  hook: "validate",
  phoneNumberField: "user_cell_number",
  nationalFormatField: "nationalFormat",
  internationalFormat: "internationalFormat",
});

module.exports = mongoose.model("LoginSystem", loginSystemSchema);
