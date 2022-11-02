// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Card, { ICard, ICardDb } from "mongoose/models/Card";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "utils/mongoose";

type ReponseType = IResponseCardGet | IResponseCardDelete | IBaseResponse;

interface IBaseResponse {
  message: string;
  stack?: any;
}

export interface IResponseCardGet extends IBaseResponse {
  isError?: boolean;
  data: ICardDb | ICardDb[] | null;
}

const cards = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseType>
) => {
  const method = req.method;

  console.log("METHOD: ", method);

  try {
    switch (req.method) {
      case "GET":
        return await getHandler(req, res);
      case "PUT":
        return await putHandler(req, res);
      case "DELETE":
        return await deleteHandler(req, res);
      default:
        return res.status(501).json({ message: "Bad method call" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", stack: err });
  }
};

export default cards;

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseCardGet>
) => {
  const { id } = req.query;

  await connect();

  let cards = null;

  if (id) {
    const queryResult: ICardDb | null = await Card.findOne({ _id: id }).catch(
      (e) => null
    );
    cards = queryResult;
  } else {
    const queryResult: Array<ICardDb> = await Card.find().catch((e) => []);
    cards = queryResult;
  }

  if (cards === null) {
    return res.status(404).json({ message: "Not found", data: null });
  }

  return res.status(200).json({ message: "Success", data: cards });
};

interface IResponseCardDelete {}

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseCardDelete>
) => {
  const { id } = req.query;

  await connect();

  await Card.deleteOne({ _id: id });

  return res.status(200).end();
};

interface IResponseCardPut {}

const putHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseCardPut>
) => {
  console.log("req.body", req.body);
  const { title, coverUrl, author, owners, quantity, price } = req.body;

  const card: ICard = {
    title,
    coverUrl,
    author,
    owners,
    quantity,
    price,
  };

  console.log("create card ", card);

  console.log("title", title);

  return res.status(200).end();
};
