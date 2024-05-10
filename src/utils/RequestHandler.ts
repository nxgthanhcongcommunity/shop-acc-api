class RequestHandler {
    constructor() {

    }

    sendSucceed(res, data = null, message = null) {
        res.status(200).json({
            succeed: true,
            message: message || "succeed result",
            data: data,
        })
    }

    sendNotFound(res, message = null) {
        res.status(404).json({
            succeed: false,
            message: message || "not found",
            data: null,
        })
    }

    sendError(res, message = null) {
        res.status(500).json({
            succeed: false,
            message: message || "error",
            data: null,
        })
    }

    sendClientError(res, message = null) {
        res.status(400).json({
            succeed: false,
            message: message || "invalid request",
            data: null,
        })
    }

    send(res, status, succeed, message, data) {
        res.status(status).json({
            succeed: succeed,
            message: message,
            data: data,
        })
    }

}

export default RequestHandler;