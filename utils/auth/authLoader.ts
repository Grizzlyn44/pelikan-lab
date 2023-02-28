import { IncomingMessage } from "http";
import { Session } from "next-auth/core/types";
import { getSession } from "next-auth/react";
import { SessionType } from "./authTypes";

export const getSessionServerSide = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }
): Promise<SessionType> => {
  const session = await getSession({ req });

  return session;
};
