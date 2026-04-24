import { Router } from "express";

import { requestOtp,verifyOtp,resendOtp } from "../controllers/auth.controller.js";

const router = Router();


router.route("/request-otp").post(requestOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);

export default router;

