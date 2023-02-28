import { ObjectId } from "mongodb";
import { Schema, model, models, Model } from "mongoose";

enum FlowTypeEnum {
  Minus = 0,
  Plus = 1,
}

enum CurrencyEnum {
  Dollar = 0,
}

export interface ITransactionDB extends ITransaction, Document {}

export interface ITransaction {
  from: ObjectId;
  to: ObjectId;
  ammount: number;
  currency: CurrencyEnum;
  flowType: FlowTypeEnum;
  date: any;
}

const transactionSchema: Schema = new Schema({
  from: ObjectId,
  to: ObjectId,
  ammount: Number,
  currency: CurrencyEnum,
  flowType: FlowTypeEnum,
  date: Date,
});

const Transaction: Model<ITransactionDB> =
  models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
