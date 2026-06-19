import { useState } from "react";


export default function Cards({total,done}){
    return(
        < >
        <div className=" flex justify-center gap-4 mt-10">
            <div className="h-20 w-44 bg-blue-500 border-0 rounded">
                <h1 className="text-white font-bold ml-2 mt-2">Total</h1>
                <p className="ml-2">{total}</p>
            </div>
            <div className="h-20 w-44 bg-blue-500 border-0 rounded">
                <h1 className="text-white font-bold ml-2 mt-2">Done</h1>
                <p className="ml-2">{done}</p>
            </div>
            <div className="h-20 w-44 bg-blue-500 border-0 rounded">
                <h1 className="text-white font-bold ml-2 mt-2">High priority</h1>
                <p className="ml-2">0</p>
            </div>
            <div className="h-20 w-44 bg-blue-500 border-0 rounded">
                <h1 className="text-white font-bold ml-2 mt-2">Overdue</h1>
                <p className="ml-2">0</p>
            </div>
        </div>
        
        </>
    )
}