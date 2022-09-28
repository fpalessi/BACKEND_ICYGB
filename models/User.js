const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    token: { type: String },
    confirmed: {
      type: Boolean,
      default: false,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// Mongoose middlewares and hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //10 rounds salt
  this.password = await bcrypt.hash(this.password, salt); //2 params, (string,hash)
});
// Fn declaration
userSchema.methods.checkPass = async function (formPass) {
  return await bcrypt.compare(formPass, this.password);
};

module.exports = mongoose.model("User", userSchema);
