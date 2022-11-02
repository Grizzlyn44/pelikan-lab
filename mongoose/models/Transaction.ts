import { Schema, model, models, Model } from "mongoose";

export interface ITransactionDB extends ITransaction, Document {}

export interface ITransaction {
  type: Number;
  quantity: Number;
  from: String;
  to: String | any;
}

const transactionSchema: Schema = new Schema({
  type: Number,
  quantity: Number,
  from: String,
  to: String,
});

const Transaction: Model<ITransactionDB> =
  models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
