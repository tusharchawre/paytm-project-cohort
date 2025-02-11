import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1/paytm-app").then(() => {
    console.log("Mongoose Connnected!!");
  });
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Account = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("User", User);
const AccountModel = mongoose.model("Account", Account);

export { UserModel, AccountModel };
