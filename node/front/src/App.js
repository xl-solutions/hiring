import React, {useState} from "react";
import "./App.css";
import { NavBar } from "./components/navbar/NavBar";
import { PortfolioContext } from "./contexts/PortfolioContext";
import { MainRouters } from "./routers/MainRouters";

export function App() {
  const listPortfolio = localStorage.getItem("portfolio") != undefined ? JSON.parse(localStorage.getItem("portfolio")) : [];
  const [portfolio, setPortfolio] = useState(listPortfolio);

  return (
      <PortfolioContext.Provider value={{portfolio, setPortfolio}}>
      <div className="App">
        <NavBar/>
        <div className="container-fluid mt-5">
          <div className="row">
            <MainRouters/>
          </div>
        </div>
      </div>
      </PortfolioContext.Provider>
  );
}