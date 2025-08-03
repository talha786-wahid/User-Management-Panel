import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "pending", "banned"],
    default: "active",
  },
  createdAt: {
    type: String,
    default: () => Date.now().toString(),
  },
});

export const User = mongoose.model("User", userSchema);
