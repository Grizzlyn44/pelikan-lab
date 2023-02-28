import { IWallet } from "mongoose/models/Wallet";
import { IResponseWalletMeGet } from "pages/api/wallet";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
import { getMyWalletUrl } from "utils/urlProvider";

const performFetch = async (
  cookies: any //@TODO ANY
): Promise<IResponseWalletMeGet> =>
  fetch(getMyWalletUrl(), {
    method: "GET",
    headers: {
      cookie: cookies,
    },
    // body: JSON.stringify({}),
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
  })
    .then(async (response) => {
      if (response.ok) {
        return response;
      } else if (response.status === 401) {
        throw CustomError.create(CustomError.codes.UNAUTHORIZED);
      } else {
        throw CustomError.create(CustomError.codes.UNKNOWN_ERROR);
      }

      throw new Error("Fetch fail [walletLoader]");
    })
    .then((response) => response.json());

export const loadMyWallet = async (
  session: SessionType,
  cookies?: any
): Promise<IWallet> => {
  //@TODO ANY
  const promise: Promise<IWallet> = new Promise((resolve, reject) => {
    performFetch(cookies)
      .then((response) => {
        if (response?.data) {
          return resolve(response?.data);
        }
        //@TODO a pokud nejsou data, tak co?
      })
      .catch((error) => {
        return reject(error);
      });
  });

  return promise;
};
