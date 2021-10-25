import api from "./Requests"

const checkLimit = (data) => {
    if (data){
        if (data.hasOwnProperty('Note'))
            alert("Limite de API aguarde um minuto")
    }
}

export async function serverAlive() {
    try {
        return api.get("/isAlive").then (
            (res) => 
            {   if (res.data==="Server Alive") {
                    return(true)
                }else{
                    return(false)
                }
            })
    } catch(e) {
        console.log("Failed to require service");
        throw e;      
    }
}


export async function searchTickers(stockName) {
    try {
        return api.get(`/stocks/${stockName}/search`)
        .then((res) => {
            if(res.data)
            {
                checkLimit(res.data)
                return res.data["bestMatches"];
            }
            
        })
    } catch(e) {
        console.log("Failed to require service");
        throw e;      
    }
}

export async function quoteStock(stockName) {
    try {
        return api.get(`/stocks/${stockName}/quote`)
        .then((res) => {
            if(res.data)
            {
                checkLimit(res.data)
                return res.data;
            }
            
        })
    } catch(e) {
        console.log("Failed to require service");
        throw e;      
    }
}

