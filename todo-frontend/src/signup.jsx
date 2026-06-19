import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign(){

    const navi=useNavigate();
 const [sign,setsign]=useState();
    const [password,signpassword]=useState();

const usersign=()=>{
    axios.post("http://localhost:3000/links/signup",{
        email:sign,
        password:password
    }).then((res)=>{
        const {token}=res.data
        localStorage.setItem("authtoken",token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
navi("/section")
    }
).catch((error)=>console.log(error))
}

    return(
        <>
<div className="h-full w-full flex justify-center mt-16">
  <div className="h-40 w-80 bg-blue-600 flex flex-col border-0 rounded ">
    <input className="h-8 w-72 text-white font-bold border-[1px] mt-3 ml-4" type="text" placeholder="email" onChange={(e)=>setsign(e.target.value)}></input>
    <input className="h-8 w-72 text-white font-bold border-[1px] ml-4 mt-2.5"  type="text" placeholder="password" onChange={(e)=>signpassword(e.target.value)}></input>
    <button className="h-10 w-16 font-bold text-white ml-32 mt-3 cursor-pointer" onClick={usersign}> Sign up</button>

  </div>
</div>
        </>
    )
}