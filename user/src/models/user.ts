import bcryptjs from "bcryptjs"
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password should be greater than 5 character."],
  },
});

authSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  console.log(this.password);
});

authSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await bcryptjs.compare(password, this.password);
  return isMatch;
};
export default mongoose.model("user", authSchema);
