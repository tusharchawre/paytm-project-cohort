import express from "express"
import {z} from "zod"
import { UserModel } from "../db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

const router = express.Router()

const signUpSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required!"
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters."
    })
})

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


router.post("/signup" , async (req, res)=>{
    const validatedFields = signUpSchema.safeParse(req.body)

    if(!validatedFields || !validatedFields.success){
        res.json({
            mesaage: "Invalid Credentials!"
        })
        return;
    }

    const {username , password, email} = validatedFields.data


    const existingUser = await UserModel.findOne({
        username,
        email
    })

    if(existingUser){
        res.json({
            message: "User already exists. Please login!"
        })
        return ;
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await UserModel.create({
        username,
        password: hashedPassword,
        email
    })

    res.json({
        user
    })
})

router.post("/signin", async (req, res)=> {
    const validatedFields = signInSchema.safeParse(req.body)

    if(!validatedFields || !validatedFields.success){
        res.json({
            message: "Invalid Credentials"
        })
        return;
    }

    const {email, password} = validatedFields.data

    const user = await UserModel.findOne({
        email
    })

    if(!user || !user.password){
        res.json("User doesnt exist")
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        res.json({
            message: "Invalid Credentials"
        })
        return;
    }
    else{
        const token = jwt.sign(user._id, JWT_SECRET)
        res.json({
            token
        })
    }


})

export {router as UserRouter}