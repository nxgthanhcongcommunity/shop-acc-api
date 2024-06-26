export { default as RequestHandler } from "./RequestHandler";

const utils = {
  generateUniqueString(length: number) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result.toUpperCase();
  },
};

export default utils;
export * from "./wsUtils";
export { default as logUtils } from "./logUtils";
export { default as validateUtils } from "./validateUtils";
export { default as jwtUtils } from "./jwtUtils";
export { default as wsUtils } from "./wsUtils";
