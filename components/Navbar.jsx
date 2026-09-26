"use client";

import Link from "next/link";
import { useState } from "react" ;
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faXmark,
} from "@fortawesome/free-solid-svg-icons" ;

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen ] = useState(false);

    const { cart } = useCart();
    return(
        <nav className="Navbar">
            <div className="logo"><a href="/">
                ShopEase</a></div>
                <div className={`nav-links ${isMenuOpen ? "active" : "" } `}>
                    <Link href="/">Home</Link>
                    <Link href="/">Products</Link>
                    <Link href="/cart">Cart({cart.length})</Link>
                   
                    </div>
                    <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}
                        ><FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars } /></button> 
                    </nav>
    );
}

