import React, { useState } from "react";

//import GigaTon from '../assets/GigaTon.png'

import {
    getPrices
} from "../api/AppRequests";

import '../styles/Home.css';

export default function Home(props) {
    const [stock, setStock] = useState("");

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
