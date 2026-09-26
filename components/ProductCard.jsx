
"use client";

import { useCart } from "../context/CartContext";


export default function ProductCard({ product }){
    const { addToCart } = useCart();
    return (
        <div className="product-card">
        <img src={product.image} alt={product.name} />

        <div className="product-info" >
            <p className="product-category">
                {product.category}
                </p>

                <h3>{product.name}</h3>
                <p className="product-price">
                 ${product.price.toLocaleString()}
                </p>

                <button onClick={() => addToCart( product )}> Add to Cart </button>
                </div>
                </div>
    );
}