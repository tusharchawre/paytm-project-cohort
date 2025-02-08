import express from "express"
import { UserRouter } from "./userRouter"

const router = express.Router()

router.use("/user", UserRouter)


export { router as mainRouter }
