import mongoose, { model } from "mongoose";

const todoSchema= new mongoose.Schema({
    titel:String,
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }
})

export const todo=mongoose.model("todo",todoSchema)
