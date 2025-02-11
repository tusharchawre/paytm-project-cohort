import express from "express";
import { UserRouter } from "./userRouter";
import { AccountRouter } from "./accountRoutes";
const router = express.Router();

router.use("/user", UserRouter);
router.use("/account", AccountRouter);

export { router as mainRouter };
