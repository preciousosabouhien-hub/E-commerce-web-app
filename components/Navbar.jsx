"use client";

import Link from "next/link";
import { useState } from "react" ;
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons" ;

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen ] = useState(false);

    const { cart } = useCart(); 
    const cartCount = cart.reduce (
        (total, item) => total + item.quantity, 0);
    return(
        <nav className="Navbar">
            <div className="logo"><a href="/">
                ShopEase</a></div>
                <div className={`nav-links ${isMenuOpen ? "active" : "" } `}>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/cart"><FontAwesomeIcon icon={faCartShopping} />  Cart ({cartCount})</Link>
                   
                    </div>
                    <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}
                        ><FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars } /></button> 
                    </nav>
    );
}

