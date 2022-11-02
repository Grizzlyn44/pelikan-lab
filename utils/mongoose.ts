import mongoose, { ConnectOptions } from "mongoose";

export const connect = async (): Promise<any> => {
  if (mongoose.connections[0]?.readyState) {
    // console.log("DB /already/ connected");
  } else {
    mongoose.connect(process?.env?.MONGO_DB_URL || "", () => {
      //   console.log("DB connected");
    });
  }
};

export const disconnect = () => {
  mongoose.disconnect(() => {
    // console.log("DB disconnected");
  });
};
