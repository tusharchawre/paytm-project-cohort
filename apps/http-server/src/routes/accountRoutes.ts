import express from "express";
import { middleware } from "../middleware";
import { AccountModel } from "../db";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", middleware, async (req, res) => {
  const userId = req.userId;

  const account = await AccountModel.findOne({
    userId,
  });

  if (!account) {
    res.json({
      message: "Account Doesnt Exist!",
    });
    return;
  }

  const balance = account.balance;

  res.json({
    balance,
  });
});

router.post("/transfer", middleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const FromAccount = await AccountModel.findOne({ userId: req.userId });

  if (!FromAccount || FromAccount.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient Balance",
    });
    return;
  }

  const ToAccount = await AccountModel.findOne({ userId: to });

  if (!ToAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Invalid Account",
    });
    return;
  }

  await AccountModel.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);
  await AccountModel.updateOne({ userId: to }, { $inc: amount }).session(
    session,
  );

  await session.commitTransaction();

  res.json({
    message: "Transaction successful",
  });
});

export { router as AccountRouter };
