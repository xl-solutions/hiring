import "./Nav.css"

import React from 'react'

export default props =>
    <aside className = "menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i> Inicio
               
            </a>

            <a href="#/desafio1">
            <i className="fa fa-users"></i> Desafio1
            </a>

            <a href="#/desafio2">
            <i className="fa fa-users"></i> Desafio2
            </a>
          
        </nav>
        
    </aside>