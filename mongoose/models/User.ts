import { Schema, model, models, Model } from "mongoose";

export interface IUserDB extends IUser, Document {}

export interface IUser {
  //   title: string;
  //   coverUrl: string;
  //   author: string;
  //   owners: string[];
  //   quantity: number;
  //   price: number;
  email: string;
  currency: number;
  joinedAt?: any;
}

const userSchema: Schema = new Schema({
  //   title: String,
  //   coverUrl: String,
  //   author: String,
  //   owners: Array<String>,
  //   quantity: Number,
  //   price: Number,
});

const User: Model<IUserDB> = models.User || model("User", userSchema);

export default User;
