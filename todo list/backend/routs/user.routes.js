import {Router} from "express"
import { genrateTokens, registerUser, userLogin, userLogout } from "../controllers/user.controllers.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyUser,userLogout)
router.route("/genrate-tokens").post(verifyUser,genrateTokens)


export default router