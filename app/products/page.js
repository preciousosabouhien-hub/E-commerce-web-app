"use client";

import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState(false);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="shop-page">
      {/* Shop heading */}
      <section className="shop-heading">
        <h1>Explore Our Shop</h1>
        <p>Find quality products at prices you'll love.</p>
      </section>

      {/* Search and categories dialog button */}
      <section className="shop-controls">
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search products"
        />

        <button
          type="button"
          className="open-categories-button"
          onClick={() => setIsCategoryDialogOpen(true)}
        >
          Browse Categories
        </button>
      </section>

      {/* Categories dialog */}
      {isCategoryDialogOpen && (
        <div
          className="category-dialog-overlay"
          onClick={() => setIsCategoryDialogOpen(false)}
        >
          <section
            className="category-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="category-dialog-header">
              <h2 id="category-dialog-title">
                Browse Categories
              </h2>

              <button
                type="button"
                className="close-category-dialog"
                onClick={() => setIsCategoryDialogOpen(false)}
                aria-label="Close categories"
              >
                &times;
              </button>
            </div>

            <div className="category-dialog-options">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category-option active"
                      : "category-option"
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryDialogOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Shop layout */}
      <div className="shop-layout">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="sidebar-section">
            <h2>Categories</h2>

            <div className="sidebar-category-list">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory === category
                      ? "sidebar-category active"
                      : "sidebar-category"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price filters */}
          <div className="sidebar-section price-filter">
            <h2>Filter by Price</h2>

            <label htmlFor="min-price">
              Minimum price (₦)
            </label>

            <input
              id="min-price"
              type="number"
              min="0"
              placeholder="e.g. 10000"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />

            <label htmlFor="max-price">
              Maximum price (₦)
            </label>

            <input
              id="max-price"
              type="number"
              min="0"
              placeholder="e.g. 50000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />

            <button
              type="button"
              className="reset-filters-button"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <section className="shop-products">
          <div className="shop-results-heading">
            <h2>
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h2>

            <p>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />

                  <Link
                    className="view-details-button"
                    href={`/products/${product.id}`}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your filters.</p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}