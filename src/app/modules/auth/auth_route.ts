import express from "express";
import { AuthControllers } from "./auth_controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth_validaionZodSchema";
import auth from "../../middleware/auth";

const router = express.Router();

// login user .
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationZodSchema),
  AuthControllers.loginUser,
);

//user  password change.
router.post(
  "/change-password",
  auth("superAdmin", "admin", "user", "developer"),
  validateRequest(AuthValidation.changePasswordValidationZodSchema),
  AuthControllers.changePassword,
);

// create user access token by refresh token.
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenCookiesValidationZodSchema),
  AuthControllers.refreshToken,
);

//user forgot password.
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordValidationZodSchema),
  AuthControllers.forgotPassword,
);

// veridy otp.
router.post(
  "/verify-otp",
  validateRequest(AuthValidation.verifyOTPValidationZodSchema),
  AuthControllers.verifyOTP,
);

// user reset password.
router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationZodSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
