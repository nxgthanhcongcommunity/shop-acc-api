import { IResponse } from "types";

class RequestHandler {
  constructor() {}

  sendSucceed(res, data = null, message = null) {
    res.status(200).json({
      succeed: true,
      message: message || "succeed result",
      data: data,
    } as IResponse<any>);
  }

  sendNotFound(res, message = null) {
    res.status(404).json({
      succeed: false,
      message: message || "not found",
      data: null,
    } as IResponse<null>);
  }

  sendError(res, message = null) {
    res.status(500).json({
      succeed: false,
      message: message || "error",
      data: null,
    } as IResponse<null>);
  }

  sendClientError(res, message = null) {
    res.status(400).json({
      succeed: false,
      message: message || "invalid request",
      data: null,
    } as IResponse<null>);
  }

  send(res, status, succeed, message, data) {
    res.status(status).json({
      succeed: succeed,
      message: message,
      data: data,
    } as IResponse<any>);
  }
}

export default RequestHandler;
