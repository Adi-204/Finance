import { Router } from "express";
import { registerUser,loginUser,logoutUser, refreshToken } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").get(refreshToken);

export default router

