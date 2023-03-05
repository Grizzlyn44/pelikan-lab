import {
  IVoteRecord,
  VoteRecordSingletonType,
} from "components/BrandNameCompare/BrandNameCompare";
import { Schema, model, models, Model } from "mongoose";

export interface IBrandTrackingDb extends IVoteRecord, Document {}

const brandTrackingSchema: Schema = new Schema({
  records: Array<VoteRecordSingletonType>,
  startTime: Date,
  endTime: Date,
  totalTime: Number,
  userBrowserInfo: Object,
});

const BrandTracking: Model<IBrandTrackingDb> =
  models.BrandTracking || model("BrandTracking", brandTrackingSchema);

export default BrandTracking;
