"use client";
 
 
 import { useState } from "react";
 import Link from "next/link";
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
    const [confirmedOrder, setConfirmedOrder] = useState(null);

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.address.trim()  
        ){
            alert("Please fill in all fields. ");
            return;
        }
        if (cart.length === 0){
        alert("Your cart is empty. Please add products before checking out.");
        return;
        }

        const order = {
            orderNumber: `SE-${Date.now()}`,
            customer: { ...formData },
            items: cart.map((item) => ({ ...item })),
            total: subtotal,
            date: new Date().toLocaleString(),
        };

    



        setConfirmedOrder(order);
        setOrderPlaced(true);
        clearCart();
      
    };


  return (
    <main className = "checkout-page" >
        <h1> Checkout</h1>
        {orderPlaced && confirmedOrder ? (
            <div className="order-success">

                            <div className="success-icon">✅</div>

                                <h2 align="center"> Order Placed Successfully!</h2>

                                <p align="center">Thank you for shopping with ShopEase,{" "}
                                    {confirmedOrder.customer.name}!</p>

                                <div className="order-confirmation-details">
                                  <p>
                                    <strong>Order Number:</strong>{" "}
                                    <strong>{confirmedOrder.orderNumber}</strong>
                                    </p>

                                <p> <strong>Order Date:</strong>{" "} 
                                {confirmedOrder.date}
                                </p>

                                <h3 align="center">Order Summary</h3>

                                {confirmedOrder.items.map((item) => (

                                <div className="confirmation-item" key={item.id}>
                                    
                                <span>{item.name} x {item.quantity}</span>
                            
                                <strong>₦{(item.price * item.quantity).toLocaleString()}</strong>
                            
                                </div>
                                    ))}
                            <div className="confirmation-total">
                            <span>Total</span>
                            <strong>₦{confirmedOrder.total.toLocaleString()}</strong>
                        </div>
                       </div>
                 <Link href="/" className="continue-shopping">
                 Continue shopping </Link>
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
                        onChange={handleChange} required/>
                        </div>
                        <div className="form-group" >
                            <label htmlFor="email">
                                Email Address
                                </label>
                                <input type="email" id="email" name="email"  placeholder="Enter your Email" value={formData.email} onChange={handleChange} required/></div>
                                   <div className="form-group" >
                            <label htmlFor="phone">
                                Phone Number
                                </label>
                                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required/></div>
                        <div className="form-group" >
                            <label htmlFor="address" >
                                Delivery Address </label>
                                <textarea id="address" name="address" placeholder="Enter your delivery address" rows="4" value={formData.address} onChange={handleChange} required></textarea>
                                </div><button type="submit" className="place-order-button" disabled={cart.length === 0}>
                                                Place order</button>   </form></section>
                            <section className="checkout-summary" >
                            <h2>Order Summary</h2>   {cart.length === 0 ?( <p className="empty-cart-text">Your Cart is empty.</p> ) :( cart.map((item) => (
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