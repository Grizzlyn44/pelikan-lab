// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Card, { ICard, ICardDb } from "mongoose/models/Card";
import { IVoteRecord } from "components/BrandNameCompare/BrandNameCompare";
import BrandTracking, { IBrandTrackingDb } from "mongoose/models/BrandTracking";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "utils/mongoose";

type ReponseType =
  | IResponseBrandTrackingGet
  | IResponseBrandTrackingPost
  | IBaseResponse;

interface IBaseResponse {
  message: string;
  stack?: any;
}

// export interface IResponseBrandTrackingGet extends IBaseResponse {
//   isError?: boolean;
//   data: IBrandTrackingDb | IBrandTrackingDb[] | null;
// }

const cards = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseType>
) => {
  const method = req.method;

  console.log("METHOD: ", method);

  try {
    switch (req.method) {
      case "POST":
        return await postHandler(req, res);
      case "GET":
        return await getHandler(req, res);
      //   case "DELETE":
      //     return await deleteHandler(req, res);
      default:
        return res.status(501).json({ message: "Bad method call" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", stack: err });
  }
};

export default cards;

export interface IResponseBrandTrackingPost extends IBaseResponse {
  data: string;
}

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseBrandTrackingPost>
) => {
  const bodyJSON = JSON.parse(req.body);

  const { records, startTime, endTime, totalTime, userBrowserInfo } = bodyJSON;

  const brandTracking: IVoteRecord = {
    records,
    startTime,
    endTime,
    totalTime,
    userBrowserInfo,
  };

  await connect();

  const create = await BrandTracking.create(brandTracking);

  return res.status(200).send({ data: "OK", message: "OK" });
};

export interface IResponseBrandTrackingGet extends IBaseResponse {
  data: Array<IVoteRecord>;
}

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseBrandTrackingGet>
) => {
  // const bodyJSON = JSON.parse(req.body);

  // const { records, startTime, endTime, totalTime, userBrowserInfo } = bodyJSON;

  // const brandTracking: IVoteRecord = {
  //   records,
  //   startTime,
  //   endTime,
  //   totalTime,
  //   userBrowserInfo,
  // };

  await connect();

  const data = await BrandTracking.find({}); // .create(brandTracking);

  return res.status(200).send({ data, message: "OK" });
};
