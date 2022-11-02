// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Card, { ICard, ICardDb } from "mongoose/models/Card";
import Wallet, { IWallet } from "mongoose/models/Wallet";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connect, disconnect } from "utils/mongoose";

type ReponseType = IResponseWalletMeGet | IBaseResponse;

interface IBaseResponse {
  message: string;
  stack?: any;
}

export interface IResponseWalletMeGet extends IBaseResponse {
  isError?: boolean;
  data?: IWallet;
}

const wallet = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseType>
) => {
  const method = req.method;

  try {
    switch (req.method) {
      case "GET":
        return await getHandler(req, res);
      default:
        return res.status(501).json({ message: "Bad method call" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", stack: err });
  }
};

export default wallet;

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseWalletMeGet>
) => {
  const session = await getSession({ req });

  const userId: string = (session as any)?.userId;

  await connect();

  const wallet = await Wallet.findOne({ ownerId: userId }).catch((e) => null);

  if (!wallet) return res.status(404).json({ message: "Not Found" });

  return res.status(200).json({ message: "Success", data: wallet });
};
