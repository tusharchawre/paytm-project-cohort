import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

declare global{
    namespace Express{
        interface Request{
            userId?: string
        }
    }
}

export const middleware = (req: Request , res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(400).json({})
    }

    const token = authHeader?.split(" ")[1]


    try{
        const decoded = jwt.verify(token! , JWT_SECRET) as {userId: string}

        if(decoded){
            req.userId = decoded.userId
            next()
        }
    }
    catch(e){
        res.json("Middleware shit")
        return;
    }
}