import products from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    return(
            <section className="products-section" >

            <div className="section-heading">
            <h2>Featured Products</h2>
            <p>Check out some of our popular products.</p>
            </div>
            <div className="product-grid" >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
                </section>
    );
}