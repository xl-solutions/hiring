import React from "react"
export default function TitleName() {
    return (
        <React.Fragment>
            <div className="div-align">
                <h1>Meu Portifolio</h1>
                <div className="div-gap">
                    <button>Incluir Ação</button>
                    <input />
                </div>
            </div>
            <style jsx>{`
                h1{
                    font-family: 'Montserrat',
                    font-size: 36px;
                    font-weight: 700; 
                    color: #333; 
                    margin: 20px 0;
                }
                button{
                    background-color: #007bff; 
                    color: #fff; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer; 
                }
                button:hover{
                    background-color: #0069d9;
                }
                .div-align{
                    
                    display: flex; 
                    justify-content: space-between;
                    align-items: center; 
                }
                .div-gap{
                    min-width:315px;
                    display: flex; 
                    justify-content: space-between;
                }
                `}</style>
        </React.Fragment>
    )
}