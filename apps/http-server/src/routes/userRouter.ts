import express from "express";
import { z } from "zod";
import { AccountModel, UserModel } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { middleware } from "../middleware";

const router = express.Router();

const signUpSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required!",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters.",
  }),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email(),
});

router.post("/signup", async (req, res) => {
  const validatedFields = signUpSchema.safeParse(req.body);

  if (!validatedFields || !validatedFields.success) {
    res.json({
      mesaage: "Invalid Credentials!",
    });
    return;
  }

  const { username, password, email } = validatedFields.data;

  const existingUser = await UserModel.findOne({
    username,
    email,
  });

  if (existingUser) {
    res.json({
      message: "User already exists. Please login!",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username,
    password: hashedPassword,
    email,
  });

  const userId = user._id;

  const account = await AccountModel.create({
    userId,
    balance: 1 + Math.random() * 100000,
  });

  res.json({
    user,
  });
});

router.post("/signin", async (req, res) => {
  const validatedFields = signInSchema.safeParse(req.body);

  if (!validatedFields || !validatedFields.success) {
    res.json({
      message: "Invalid Credentials",
    });
    return;
  }

  const { email, password } = validatedFields.data;

  const user = await UserModel.findOne({
    email,
  });

  if (!user || !user.password) {
    res.json("User doesnt exist");
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.json({
      message: "Invalid Credentials",
    });
    return;
  } else {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      token,
    });
  }
});

router.put("/", middleware, async (req, res) => {
  const validatedFields = updateSchema.safeParse(req.body);

  if (!validatedFields || !validatedFields.success) {
    res.json({
      message: "Invalid Credentials",
    });
    return;
  }

  const { email, password, username } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.updateOne(
    {
      email,
      password: hashedPassword,
      username,
    },
    {
      _id: req.userId,
    },
  );

  res.json({
    message: "Updated succcessfully!",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await UserModel.find({
    $or: [
      {
        username: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      _id: user._id,
    })),
  });
});

export { router as UserRouter };
