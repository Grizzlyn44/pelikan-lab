import { Schema, model, models, Model } from "mongoose";

export interface ICardDb extends ICard, Document {}

export interface ICard {
  title: string;
  coverUrl: string;
  author: string;
  owners: string[];
  quantity: number;
  price: number;
}

const cardSchema: Schema = new Schema({
  title: String,
  coverUrl: String,
  author: String,
  owners: Array<String>,
  quantity: Number,
  price: Number,
});

const Card: Model<ICardDb> = models.Card || model("Card", cardSchema);

export default Card;
