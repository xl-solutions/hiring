import * as React from "react";
import "./App.css";
import { NavBar } from "./components/navbar/NavBar";

export function App() {
  return (
    <div className="App">
      <NavBar/>
      <h1>Welcome to React Router!</h1>
    </div>
  );
}