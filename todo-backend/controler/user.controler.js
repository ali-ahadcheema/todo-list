import express from "express"
import { User } from "../model/user.model.js"
import { todo } from "../model/todo.model.js"
import bcrypt from "bcrypt"
import jwt from"jsonwebtoken"

export const createuser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const hashpasword=await bcrypt.hash(password,10)
        const user=new User({name,email,password:hashpasword})
        await user.save()
        if(!user){
            return res.status(401).json({message:"user not created"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
res.json({token:token})
    }
    catch(error){
        return res.status(401).json(error)
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log("password"+password)
        console.log("email"+email)
        const userfind=await User.findOne({email})
        if(!userfind){
            return res.status(401).json({message:"user nt find"})
        }
        const paswordcheck=await bcrypt.compare(password,userfind.password)
        if(!paswordcheck){
            return res.status(401).json({message:"password incorect"
            })
        }
const token=jwt.sign({id:userfind.id},process.env.JWT_SECRET,{expiresIn:"7d"});
res.json({token:token})
    }
    catch(error){
        return res.status(401).json(error)
    }
}

export const tododata=async(req,res)=>{
    try{
          console.log("todo route hit");
  
       const {titel}=req.body
        const newtodo= new todo({titel,user:req.user?.id})
        await newtodo.save();
        if(!newtodo){
            return res.status(401).json({message:"todo not created"})
        }
res.json(newtodo)
    }
    catch(error){
        return res.status(401).json({error})
    }
}

export const gettodo=async(req,res)=>{
    try{
        const data=await todo.find({user:req.user.id})
        if(!data){
             return res.status(401).json({message:"todo data not come"})
        }
        res.json(data)
    }
    catch(error){
        return res.json(error)
    }
}

export const deltodo=async(req,res)=>{
    try{
        const id=req.params.id
        const del=await todo.findByIdAndDelete(id)
        if(!del){
            res.status(401).json({message:"eror occur"})
        }
        res.json({message:"todo deleted"})
    }
    catch(eror){
        res.status(500).json({eror})
    }
}

export const update=async(req,res)=>{
    try{
        const id=req.params.id
      const updatetodo=await todo.findById(id)
      if(!updatetodo){
        res.status(404).json({message:"not updated"})
      }
      updatetodo.titel=req.body.titel
      await updatetodo.save();
      res.json(updatetodo)
    }
    catch(eror){
        res.status(401).json(eror)
    }
}
