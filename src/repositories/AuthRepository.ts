import axios from "axios";

export interface IGetUserInfoFromGoogleReq {
    access_token: string;
}

class AuthRepository {
    GetUserInfoFromGoogle = async (req: IGetUserInfoFromGoogleReq) => {
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${req.access_token}`,
                    Accept: "application/json",
                },
            }
        );

        return response;
    }
}

export default AuthRepository;