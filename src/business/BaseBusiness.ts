import { IResponse } from "interfaces"

class BaseBusiness {
    static Error: IResponse<any> = {
        succeed: false,
        message: "server error",
        data: null
    }

    static Success<T>(data: T): IResponse<T> {
        return {
            succeed: true,
            message: "",
            data: data
        }
    }

}

export default BaseBusiness;