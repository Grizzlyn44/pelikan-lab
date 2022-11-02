// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Card from "mongoose/models/Card";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "utils/mongoose";

interface IResponseCardAdd {
  message: string;
  isError?: boolean;
  content?: any;
}

interface IRequestCardAdd {
  title: string;
  coverUrl: string;
  author: string;
  owners: Array<string>;
  quantity: number;
  price: number;
}

const addCard = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseCardAdd>
) => {
  try {
    await connect();

    const card = await Card.create({
      title: "test",
      coverUrl: "",
      author: "PelikanLAB",
      owners: [],
      quantity: 1,
      price: 0,
    });

    return res.status(200).json({ message: "Created", content: card });
  } catch (e) {
    console.log("err", e);
    return res.status(500).json({ message: "Error", content: e });
  }
};

export default addCard;
