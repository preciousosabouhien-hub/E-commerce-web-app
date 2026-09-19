export default function ProductCard({ product }){
    return (
        <div className="product-card">
        <img src={product} alt={product} />

        <div className="product-info" >
            <p className="product-category">
                {product.category}
                </p>

                <h3>{product.name}</h3>
                <p className="product-price">
                 ${product.price.toLocaleString()}
                </p>

                <button> Add to Cart </button>
                </div>
                </div>
    );
}