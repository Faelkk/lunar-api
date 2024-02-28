import { CustomServerResponse } from "../types/httpType";

export const sendErrorResponse = (res: CustomServerResponse, err: any) => {
  return res.send!(err.statusCode, `Error: ${err.statusCode} ${err.message}`);
};
