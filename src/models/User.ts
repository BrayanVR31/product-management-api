import { Schema, model } from "mongoose";
import { UserInt } from "../interfaces";

export const userSchema = new Schema<UserInt.UserModel>(
  {
    userName: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// hide password when method is called
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const User = model<UserInt.UserModel>("User", userSchema);

export default User;
