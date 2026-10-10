
"use client";

import { useCart } from "../context/CartContext";
import { Link } from "react";


export default function ProductCard({ product }){
    const { addToCart } = useCart();
    return (
        <div className="product-card">
             <a href={`/products/${product.id}`}> 
      <img src={product.image} alt={product.name} />
        </a>
        <div className="product-info" >
            <p className="product-category">
                {product.category}
                </p>

                <h3>{product.name}</h3>
                <p className="product-price">
                 ₦{product.price.toLocaleString()}
                </p>

                <button className="add-to-cart-button" onClick={() => addToCart( product )}> Add to Cart </button>
                </div>
                </div>
    );
}