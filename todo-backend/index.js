import express from "express"
import mongoose from "mongoose"
import dotenv from"dotenv"
import core from "cors"
import router from "./router/user.router.js"
import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config()
const app=express()
app.use(express.json())
app.use(core({
  origin: "http://localhost:5173"
}))
app.use("/links",router)

mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("mongoose conected")
).catch(
    (err)=>console.log("mongoose error:", err.message)
)

app.listen(process.env.PORT,()=>{
    console.log("server start")
})
