import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "utils/mongodb";
import { connect } from "utils/mongoose";
import Wallet, { IWallet } from "mongoose/models/Wallet";
import Transaction, { ITransaction } from "mongoose/models/Transaction";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "", //604071976681-cm8l843ricldrbp6hen080bdrut7ic7e.apps.googleusercontent.com
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", //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
    }),
  ],
  secret: process.env.JWT_SECRET,
  events: {
    createUser: async (userData) => {
      //   console.log("event create user", userData);

      await connect();

      const userWallet: IWallet = {
        ownerId: userData.user.id,
        amount: 0,
      };

      const createdWallet = await Wallet.create(userWallet);

      // const initialTransaction: ITransaction = {
      //   type: 1,
      //   from: "SYSTEM",
      //   to: createdWallet._id,
      //   quantity: 5000,
      // };

      // await Transaction.create(initialTransaction);

      // await Wallet.findOneAndUpdate(
      //   { _id: createdWallet._id },
      //   { $set: { currency: 5000 } },
      //   { new: true }
      // );
    },
  },
  callbacks: {
    session: async (data) => {
      const session = { ...data.session, userId: data?.user?.id };

      return Promise.resolve(session);
    },
    //     async signIn(data) {
    //       const { user, account, profile, /*email,*/ credentials } = data;
    //       const email = user?.email;
    //       console.log("API::signIn", data);
    //       return true;
    //     },
    //     async redirect(data) {
    //       const { url, baseUrl } = data;
    //       console.log("API::redirect", data);
    //       return baseUrl;
    //     },
    //     async session(data) {
    //       const { session, user, token } = data;
    //       console.log("API::session", data);
    //       return session;
    //     },
    //     async jwt(data) {
    //       const { token, user, account, profile, isNewUser } = data;
    //       console.log("API::jwt", data);
    //       return token;
    //     },
  },
});

/*
API::redirect
API::signIn <- tady check
API::jwt
session undefined
API::redirect
API::jwt
API::session <- tady update
API::redirect
API::jwt
API::session <- asi taky update
*/
