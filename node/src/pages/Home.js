import React, { useState, useEffect } from "react";

//import GigaTon from '../assets/GigaTon.png'

import {
    getPrices
} from "../api/AppRequests";

import '../styles/Home.css';

export default function Home(props) {
    const [stock, setStock] = useState("");

    // useEffect(() => {
    //     const serverAliveReq = getPrices("PETR4.SA");
    //     console.log("res", serverAliveReq);
    // },[stock]);

    return ( 
        <>
        <div className="page">
        <label>
            Ação:
            <input type="text" defaultValue={stock} onChange={(e)=>setStock(e.value)} />
        </label>
        </div>
        </>
        );
}
