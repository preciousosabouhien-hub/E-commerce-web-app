"use client";

import { useState } from "react" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faXmark,
} from "@fortawesome/free-solid-svg-icons" ;

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen ] = useState(false);
    return(
        <nav className="Navbar">
            <div className="logo"><a href="/">
                ShopEase</a></div>
                <div className={`nav-links ${isMenuOpen ? "active" : "" } `}>
                    <a href="/">Home</a>
                    <a href="/">Products</a>
                    <a href="/">Cart</a>
                   
                    </div>
                    <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}
                        ><FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars } /></button> 
                    </nav>
    );
}

