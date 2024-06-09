import passport from "passport";
import { AuthController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google-callback",
  passport.authenticate("google", {
    session: false,
    access_type: "offline",
    scope: ["email", "profile"],
  }),
  AuthController.GoogleCallback
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook-callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  AuthController.FacebookCallback
);

router.post("/google", AuthController.HandleGoggleLoginAsync);

export default router;
