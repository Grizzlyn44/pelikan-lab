import { IVoteRecord } from "components/BrandNameCompare/BrandNameCompare";
import { IWallet } from "mongoose/models/Wallet";
import {
  IResponseBrandTrackingGet,
  IResponseBrandTrackingPost,
} from "pages/api/brand";
import { IResponseWalletMeGet } from "pages/api/wallet";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
import { getBrandTrackingUrl, getMyWalletUrl } from "utils/urlProvider";

export const saveBrandTracking = async (
  trackingData: IVoteRecord
): Promise<IResponseBrandTrackingPost> => {
  const performFetch = async (
    trackingData: IVoteRecord
  ): Promise<IResponseBrandTrackingPost> =>
    fetch(getBrandTrackingUrl(), {
      method: "POST",
      // headers: {
      //   cookie: cookies,
      // },
      body: JSON.stringify(trackingData),
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

  //@TODO ANY
  const promise: Promise<IResponseBrandTrackingPost> = new Promise(
    (resolve, reject) => {
      performFetch(trackingData)
        .then((response) => {
          if (response?.data) {
            // console.log("response?", response);
            return resolve(response);
          }
          //@TODO a pokud nejsou data, tak co?
        })
        .catch((error) => {
          return reject(error);
        });
    }
  );

  return promise;
};

export const getBrandTracking =
  async (): Promise<IResponseBrandTrackingGet> => {
    const performFetch = async (): Promise<IResponseBrandTrackingGet> =>
      fetch(getBrandTrackingUrl(), {
        method: "GET",
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

    //@TODO ANY
    const promise: Promise<IResponseBrandTrackingGet> = new Promise(
      (resolve, reject) => {
        performFetch()
          .then((response) => {
            if (response?.data) {
              return resolve(response);
            }
            //@TODO a pokud nejsou data, tak co?
          })
          .catch((error) => {
            return reject(error);
          });
      }
    );

    return promise;
  };
