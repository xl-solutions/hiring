import * as React from "react";
import "./App.css";
import { NavBar } from "./components/navbar/NavBar";
import { MainRouters } from "./routers/MainRouters";

export function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="container-fluid mt-5">
        <div className="row">
          <MainRouters/>
        </div>
      </div>
    </div>
  );
}