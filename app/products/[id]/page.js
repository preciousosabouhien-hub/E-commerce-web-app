"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import products from "../../../data/products";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: "5",
    comment: "",
  });

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
        <Link href="/products">Back to Shop</Link>
      </main>
    );
  }

  const handleReviewChange = (event) => {
    const { name, value } = event.target;

    setReviewForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      alert("Please enter your name and feedback.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name.trim(),
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment.trim(),
    };

    setReviews((currentReviews) => [
      newReview,
      ...currentReviews,
    ]);

    setReviewForm({
      name: "",
      rating: "5",
      comment: "",
    });
  };

  return (
    <main className="product-details-page">
      <Link href="/products" className="back-to-shop">
        ← Back to Shop
      </Link>

      <section className="product-details">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-price">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="product-description">
            Discover the quality and style of our {product.name}.
            Designed to complement your lifestyle, this product
            is a great addition to your collection.
          </p>

          <button
            className="details-add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </section>

      <section className="reviews-section">
        <h2>Customer Reviews & Feedback</h2>

        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to share your feedback!
          </p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <article className="review-card" key={review.id}>
                <h3>{review.name}</h3>

                <p
                  className="review-stars"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>

                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        )}

        <form
          className="review-form"
          onSubmit={handleReviewSubmit}
        >
          <h3>Write a Review</h3>

          <div className="review-form-group">
            <label htmlFor="review-name">Your Name</label>

            <input
              id="review-name"
              type="text"
              name="name"
              value={reviewForm.name}
              onChange={handleReviewChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="review-form-group">
            <label htmlFor="review-rating">Your Rating</label>

            <select
              id="review-rating"
              name="rating"
              value={reviewForm.rating}
              onChange={handleReviewChange}
            >
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★☆ - Very Good</option>
              <option value="3">★★★☆☆ - Good</option>
              <option value="2">★★☆☆☆ - Fair</option>
              <option value="1">★☆☆☆☆ - Poor</option>
            </select>
          </div>

          <div className="review-form-group">
            <label htmlFor="review-comment">
              Your Feedback
            </label>

            <textarea
              id="review-comment"
              name="comment"
              value={reviewForm.comment}
              onChange={handleReviewChange}
              placeholder="Share your experience with this product..."
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-review-button">
            Submit Review
          </button>
        </form>
      </section>
    </main>
  );
}