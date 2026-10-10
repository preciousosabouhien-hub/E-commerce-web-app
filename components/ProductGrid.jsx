import products from "../data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductGrid() {
  // Display only 6 products on the homepage
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="products-section">
      <div className="section-heading">
        <h2>Featured Products</h2>
        <p>Check out some of our popular products.</p>
      </div>

      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="view-all-products">
        <Link href="/products">
          View All Products →
        </Link>
      </div>
    </section>
  );
}