import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


export default function Login(){
    const navi=useNavigate()
    const [login,setlogin]=useState("");
    const[pasword,loginpasword]=useState("");

    const userlogin=()=>{
        axios.post("http://localhost:3000/links",{
            email:login,
            password:pasword
        }).then((res) => {
  console.log(res.data)  // ← kya aa raha hai?
  const {token}=res.data
  localStorage.setItem("authtoken", token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 navi("/section")
}).catch((error)=>console.log(error))
    }



    return(
        <>
<div className="h-full w-full flex justify-center mt-16">
  <div className="h-40 w-80 bg-blue-600 flex flex-col border-0 rounded ">
    <input className="h-8 w-72 text-white font-bold border-[1px] mt-3 ml-4" type="text" placeholder="email" onChange={(e)=>setlogin(e.target.value)}></input>
    <input className="h-8 w-72 text-white font-bold border-[1px] ml-4 mt-2.5"  type="text" placeholder="password" onChange={(e)=>loginpasword(e.target.value)}></input>
    <button className="h-10 w-16 font-bold text-white ml-32 mt-3 cursor-pointer" onClick={userlogin}> login</button>
    <p className="ml-10"> if you have not account ? <Link className="text-white font-bold" to="/sign">sign</Link></p>
  </div>
</div>
        </>
    )
}