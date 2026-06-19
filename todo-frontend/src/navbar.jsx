
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <>
           <div>
      <div className='flex justify-around mt-2 '>
      <h1 className='font-bold text-blue-900 text-lg'>TODO <span className='font-bold text-blue-700'>list</span></h1>
      <div className='flex gap-2'>
<ul className="list-none flex gap-2">
    <li><Link className="text-blue-600 font-bold" to="/login">Login</Link></li>
    <li><Link className="text-blue-600 font-bold" to="/sign"> Sign up</Link></li>
</ul>
      </div>

      </div>

    </div>
        </>
    )
}