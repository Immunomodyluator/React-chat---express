import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  login: { type: String, unique: true, required: true },
});

export default mongoose.model("User", UserModel);
