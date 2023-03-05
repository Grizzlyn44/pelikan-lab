import {
  IVoteRecord,
  VoteRecordSingletonType,
} from "components/BrandNameCompare/BrandNameCompare";
import { Schema, model, models, Model } from "mongoose";

export interface IBrandTrackingDb extends IVoteRecord, Document {}

// export interface ICard {
//   title: string;
//   coverUrl: string;
//   author: string;
//   owners: string[];
//   quantity: number;
//   price: number;
// }

const brandTrackingSchema: Schema = new Schema({
  records: Array<VoteRecordSingletonType>,
  totalTime: Number,
  //   title: String,
  //   coverUrl: String,
  //   author: String,
  //   owners: Array<String>,
  //   quantity: Number,
  //   price: Number,
});

const BrandTracking: Model<IBrandTrackingDb> =
  models.BrandTracking || model("BrandTracking", brandTrackingSchema);

export default BrandTracking;
