import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const middelware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        console.log(token)
        if(!token){
            return res.status(401).json({message:"token not get"})
        }
        const check=jwt.verify(token,process.env.JWT_SECRET)
        console.log(check)
        req.user=check
        next()
    }
    catch{
        res.json({message:"total eror"})
    }
}

