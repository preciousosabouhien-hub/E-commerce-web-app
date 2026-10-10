"use client";

import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

export default function ProductsPage(){
    const [ searchTerm, setSearchTerm ] = useState("");
    
    const [ selectedCategory, setSelectedCategory ] = useState("All");

    const categories = [ "All", ...new Set(products.map((product) => product.category)), ];
    
    const filteredProducts = products.filter((product) => {
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
    });

    return (
        <main className="shop-page">
            <section className="shop-heading">
                <h1>Explore Our Shop</h1>
                <p> Find quality products at prices you'll love.</p>
            </section>
            <section className="shop-controls">
                <input type="search" placeholder="Search products..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} aria-label="Search products" />
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} aria-label="Filter by category" >
                    {categories.map((category) =>(
                    <option key={category} value={category}> {category} </option>
                    ))}
                </select>
            </section>
            <section className="shop-products">
                {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                                <Link className="view-details-button" href={`/products/${product.id}`}>
                                View Details </Link>
                                </div> ))}
                                </div>
                            ): ( <p className="no-products"> No products found. Try another search. </p> 

                            )} 
                            </section>
                            </main>
                    
    );
}