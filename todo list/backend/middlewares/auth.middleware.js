import { User } from "../models/user.model.js"
import { ApiErrors } from "../utils/ApiErrors.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import jwt from "jsonwebtoken"
const verifyUser = asyncHandler(async (req,_,next) => {
   try {
     const accessToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
     if (!accessToken) {
        throw new  ApiErrors(400, "comming token not found ")
     }
     const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
     if (!decodedToken) {
        throw new  ApiErrors(400, "token invalid! ")
     }
     const user =await User.findById(decodedToken?._id).select("-password -refreshToken")
     if(!user){
        throw new  ApiErrors(400, "user not found")
     }
     req.user = user;
     next()
   } catch (error) {
    throw new  ApiErrors(400, "Access Denied due to invalid token")
   }
})
export {verifyUser}