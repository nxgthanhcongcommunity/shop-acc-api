import { RequestHandler } from "../utils";
import * as db from '../db';

const requestHandler = new RequestHandler();

class MasterDataController {
    async GetByKey(req, res) {
        try {
            const { key } = req.query;

            const result = await db.queryFirstOrDefaultAsync('select * from masterdata where key=$1', [key])
            if (result == null) {
                requestHandler.sendNotFound(res, "data not found");
            }

            const data = JSON.parse(result.value);
            requestHandler.sendSucceed(res, data);
        } catch (ex) {
            requestHandler.sendError(res);
        }
    }
}

export default new MasterDataController();