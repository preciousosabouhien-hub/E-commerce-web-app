"use client";
 
 
 import { useState } from "react";
 import { useCart } from "../../context/CartContext";

 export default function CheckoutPage() {
    const{ cart, clearCart } = useCart(); 

    const [ formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = ( event ) => {
        const { name , value } = event.target;
         
        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };
    
    const [orderPlaced, setOrderPlaced] = useState(false);

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address  
        ){
            alert("Please fill in all fields. ");
            return;
        }

        alert("Order placed successfully!");

        console.log("Customer Information:", formData);
        console.log("Order:", cart);

        clearCart();
        setOrderPlaced(true);
    };


  return (
    <main className = "checkout-page" >
        <h1> Checkout</h1>
        {orderPlaced ? (
            <div className="order-success">
                <h2> Order Placed Successfully!</h2>
                <p>Thank you for shopping with ShopEase.
                    </p>
                 <a href="/" className="continue-shopping">
                 continue shopping </a>
                 </div>
        ) : (
               
        <div className="checkout-form" >
           <section className="checkout-form-container" >
            <h2>Customer Information </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Full name
                        </label>
                        <input type="text"  id="name"  name="name" placeholder="Enter your full name" value={formData.name} 
                        onChange={handleChange} />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="email">
                                Email Address
                                </label>
                                <input type="email" id="email" name="email"  placeholder="Enter your Email" value={formData.email} onChange={handleChange}/></div>
                                   <div className="form-group" >
                            <label htmlFor="phone">
                                Phone Number
                                </label>
                                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange}/></div>
                        <div className="form-group" >
                            <label htmlFor="address" >
                                Delivery Address </label>
                                <textarea id="address" name="address" placeholder="Enter your delivery address" rows="4" value={formData.address} onChange={handleChange}></textarea>
                                </div><button type="submit" className="place-order-button">
                                                Place order</button></form></section>
                            <section className="checkout-summary" >
                            <h2>Order Summary</h2>
                            {cart.length === 0 ?( <p className="empty-cart-text">Your Cart is empty.</p> ) :( cart.map((item) => (
                                <div className="checkout-item" key={item.id}>
                                    <div><h3> {item.name}</h3>
                                    <p>{item.quantity} x ₦{item.price.toLocaleString()}</p>
                                    </div>
                                <strong>
                                    ₦{(
                                        item.price * item.quantity).toLocaleString()}
                                        </strong>
                                        </div> ))
                                    )}

                                        <div className="checkout-total"><span>Total</span>
                                        <strong> ₦{subtotal.toLocaleString()}
                                            </strong>
                                            </div>
                                                </section>
                                                </div>  )}
                                                </main>
                                    
                            );

}