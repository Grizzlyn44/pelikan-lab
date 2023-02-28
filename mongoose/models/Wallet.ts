import { Schema, model, models, Model } from "mongoose";

export interface IWalletDB extends IWallet, Document {}

export interface IWallet {
  ownerId: String;
  amount: number;
  error?: any; //@TODO error type
}

const walletSchema: Schema = new Schema({
  ownerId: String,
  amount: Number,
});

const Wallet: Model<IWalletDB> = models.Wallet || model("Wallet", walletSchema);

export default Wallet;
