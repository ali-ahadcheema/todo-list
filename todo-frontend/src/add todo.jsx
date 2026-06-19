import axios from "axios"
import { useEffect, useState } from "react"


export default function Todo(){
const [input, setInput] = useState("")
    const [data,setadd]=useState("");
  const add=()=>{
    const token = localStorage.getItem("authtoken");
    axios.post("http://localhost:3000/links/todo",{
        titel:input
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res)=>{
        setadd(res.data)
        setInput("")
    }).catch((error)=>console.log(error))
  }
    return(
        <>
        <div className="flex justify-center mt-4">
        <div className="h-20  w-lg border-[2px] border-blue-600 rounded  ">
        <div className="flex gap-4 items-center justify-around mt-2">
            <input className="border-[1px] h-8 w-72 border-blue-600 rounded " type="text" placeholder="what need to be done" value={input} onChange={(e)=>setInput(e.target.value)}></input>
            <button className="text-white bg-blue-700 font-bold h-7 w-14 rounded" onClick={add}>+ Add</button>
        </div>
        </div>
        </div>
        </>
    )
}