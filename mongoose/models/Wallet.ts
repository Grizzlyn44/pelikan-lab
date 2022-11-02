import { Schema, model, models, Model } from "mongoose";

export interface IWalletDB extends IWallet, Document {}

export interface IWallet {
  ownerId: String;
  currency: Number;
}

const walletSchema: Schema = new Schema({
  ownerId: String,
  currency: Number,
});

const Wallet: Model<IWalletDB> = models.Wallet || model("Wallet", walletSchema);

export default Wallet;
