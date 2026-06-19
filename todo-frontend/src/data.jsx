import { useState,useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import axios from "axios";


export default function Data({total,settotal,setdone,done}){
 const [data,setdata]=useState([]);
const [marked, setMarked] = useState([])
const [input,setinput]=useState("");
const [filter, setFilter] = useState("all")
const [editId, setEditId] = useState(null) 

const filteredData = () => {
  if (filter === "done") return data.filter(item => marked.includes(item._id))
  if (filter === "active") return data.filter(item => !marked.includes(item._id))
  return data  // all
}

const toggleMark = (id) => {
  if (marked.includes(id)) {
    setMarked(marked.filter(m => m !== id)) 
  } else {
    setMarked([...marked, id])  
  }
}

 useEffect(()=>{
  const token=localStorage.getItem("authtoken")
  console.log("token:", token)
     axios.get("http://localhost:3000/links/gettodo",{
      headers:{
Authorization: `Bearer ${token}`
      }
     }) .
    then((res)=>{
      console.log(res.data)
        setdata(res.data)
  
    }
).
    catch((error)=>console.log(error))
 },[])
 useEffect(()=>{
  settotal(data.length)
  setdone(marked.length)

 },[data,marked])

 const get=()=>{
  const token=localStorage.getItem("authtoken")
     axios.get("http://localhost:3000/links/gettodo",{
      headers:{
        Authorization:`Bearer ${token}`
      }
     }) .
    then((res)=>{
        setdata(res.data)
    }
).
    catch((error)=>console.log(error))
 }
{/* 
useEffect(()=>{
  const interval=setInterval(() => {
    get();
  }, 5000);
  return ()=>clearInterval(interval)
},[])*/}

 const del=async(id)=>{
 const token=localStorage.getItem("authtoken")
 try{
  await axios.delete(`http://localhost:3000/links/del/${id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
 }
)
setdata(data.filter((item)=>item._id!==id))
 }
 catch(error){
  console.log(error)
 }
 }
 const edit=async(id)=>{
try{
  const token=localStorage.getItem("authtoken")
  await axios.put(`http://localhost:3000/links/update/${id}`,{
    
      titel:input
    },{
      headers:{
        Authorization :`Bearer ${token}`
      }

    })
    setEditId(null)
    setinput("")
   await get()
}
  catch(error){
    console.log(error)
  }
 }
 const handelkey=(e,id)=>{
  console.log("prees")
  if(e.key==="Enter"){
    console.log("enter pressed")
    edit(id)
  }
 }


    return(
        <>
        <div className="flex gap-2 justify-center mt-2 items-center">
          <button id="all" className="h-10 w-20 text-center bg-blue-500 text-white border-0 rounded cursor-pointer"onClick={() => { setFilter("all"); get(); }} >All</button>   
                   <button className="h-10 w-20 text-center bg-blue-500 text-white border-0 rounded cursor-pointer" onClick={()=>setFilter("active")}>Active </button> 
           <button id="done" className="h-10 w-20 text-center bg-blue-500 text-white border-0 rounded cursor-pointer" onClick={()=>setFilter("done")}>Done</button> 
            
        </div>
         <div className="flex flex-col justify-center w-full ml-110 mt-3">
           {   
     Array.isArray(data) && filteredData().map((item, index) => (
  <div key={item._id} className="flex items-center justify-around h-8 w-96 border-[1px]">
    <div className="flex items-center gap-1">
      <button onClick={() => toggleMark(item._id)}>
        {marked.includes(item._id) ? (
          <img className="h-5 w-6" src="https://img.icons8.com/?size=100&id=25534&format=png&color=000000" />
        ) : (
          <img className="h-5 w-6" src="https://img.icons8.com/?size=100&id=19336&format=png&color=000000" />
        )}
      </button>
     <h1 className="font-medium text-black">
  {editId === item._id ? (
    <input 
      value={input}
      onChange={(e) => setinput(e.target.value)}
      onKeyDown={(e)=>handelkey(e,item._id)}
      className="border-[1px] border-blue-500 rounded"
    />
  ) : (
    item.titel
  )}
</h1> 
    </div >
<div className="flex gap-2">
<button className="cursor-pointer" onClick={()=>del(item._id)}> <img className="h-6 w-6" src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000" /></button>

<button onClick={() => {
  if (editId === item._id) {
    edit(item._id) 
  } else {
    setEditId(item._id) 
    setinput(item.titel)
  }
}}>
  <FaEdit className="h-6 w-6" />
</button>
</div>
  </div>
))  }
        </div>
        </>
    )
}