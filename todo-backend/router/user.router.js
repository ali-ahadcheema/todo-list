import express from"express"
import { createuser,login,tododata,gettodo,deltodo,update } from "../controler/user.controler.js"
import { middelware } from "../authmiddel/user.auth.js";


const router=express.Router();

router.post("/signup",createuser)
router.post("/",login)
router.post("/todo",middelware,tododata)
router.get("/gettodo",middelware,gettodo)
router.delete("/del/:id",middelware,deltodo)
router.put("/update/:id",middelware,update)

export default router