import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth_service";

// user login contoller.
const loginUser = catchAsync(async (req, res) => {
  //stored result.
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, refreshToken } = result;

  //set refresh token in cookie.
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  });

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Login success!",
    data: {
      token: accessToken,
    },
  });
});

export const AuthControllers = { loginUser };
