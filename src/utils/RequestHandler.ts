class RequestHandler {
    constructor() {

    }

    sendSucceed(res, data, message = null) {
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

}

export default RequestHandler;