import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// options to secure teh cookies
const options = {
  // httponly: true,
  secure: false,
  samesite:"None"
};
// genrate Tokens
const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.genrateAccessTokens();
    const refreshToken = user.genrateRefreshTokens();
    if (!accessToken || !refreshToken) {
      throw new ApiErrors(400, "Error While Genrating Tokens");
    }
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(400, "Error While Genrating Tokens");
  }
};
// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiErrors(400, "please provide all the fields");
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password,
  });
  if (!user) {
    throw new ApiErrors(400, "Error while creating the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user created successfully"));
});

// User Login

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiErrors(400, "username or password not found");
  }
  const user = await User.findOne({
    username: username,
  });
  if (!user) {
    throw new ApiErrors(400, "user not found ");
  }
  const validUser = user.checkPassword(password);
  if (!validUser) {
    throw new ApiErrors(400, "Your Password is incorrect");
  }
  const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
    user?._id
  );

  const userWithTasks = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "user",
        as: "tasks",
      },
    },
    {
      $addFields: {
        tasks: "$tasks",
      },
    },
    {
      $project:{
        username:1,
        tasks:1,
        email:1,
        _id:1,
        refreshToken:1

      }
    }
  ]);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, userWithTasks[0], "successfully Logind"));
});

// user logout
const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.user._id);
  if (!user) {
    throw new ApiErrors(400, "user not found ");
  }
  user.refreshToken = "";
  await user.save();
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user Loged out successfully"));
});

// genrate the tokens when the access token is expired
const genrateTokens = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
        req?.user?._id
      );

      if(!accessToken || !refreshToken){
        throw new ApiErrors(400, "error while genrating Tokens")
      }
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, {}, "token genrated Successfully"))
});


export { registerUser, userLogin, userLogout ,genrateTokens};
