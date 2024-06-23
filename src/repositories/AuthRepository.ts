import axios from "axios";

class AuthRepository {
  GetUserInfoFromGoogle = async (accessToken: string) => {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  };
}

export default AuthRepository;
