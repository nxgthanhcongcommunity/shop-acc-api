import * as db from "../db";

class AuthRepository {
  async GetUserByProvider(providerId, provider) {
    const query = {
      text: "SELECT * from users where providerId=$1 and provider=$2",
      values: [providerId, provider],
    };

    var result = await db.query(query);
    console.log(result);
    return null;
  }
}

export default AuthRepository;
