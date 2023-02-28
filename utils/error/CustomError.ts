import { customErrorCodes } from "utils/error/customErrorCodes";

export interface ICustomErrorObject {
  code: number;
  messageData: string;
}

export class CustomError extends Error {
  static codes = customErrorCodes;

  code: any;
  messageData: any;
  isError = true;

  constructor(...props: any) {
    super(...props);
    if ("hasCaptureStackTrace" in Error) {
      //@ts-ignore
      Error.captureStackTrace(this, CustomError);
    }
  }

  static create = (code: any, messageData?: any): CustomError => {
    const error = new CustomError(code);

    error.code = code;
    error.messageData = messageData;

    return error;
  };

  static createCustomErrorObj = (error: CustomError): ICustomErrorObject => {
    return {
      code: error?.code,
      messageData: error?.messageData || "",
    };
  };
}
