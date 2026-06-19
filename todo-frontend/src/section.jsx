import { useState } from "react";
import Cards from "./cards";
import Todo from "./add todo";
import Data from "./data";

export default function Section(){
    const [total,settotal]=useState(0);
    const [done,setdone]=useState(0);
    return(
        <>
<Cards  total={total} done={done}/>
      <Todo />
      <Data  total={total} settotal={settotal} done={done} setdone={setdone} />
        </>
    )
}