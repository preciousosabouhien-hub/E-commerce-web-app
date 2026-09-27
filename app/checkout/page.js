"use client";
 import { useCart } from "../../context/CartContext";

 export default function CheckoutPage() {
    const{ cart } = useCart(); 

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

  return (
    <main className = "checkout-page" >
        <h1> Checkout</h1>
        <div className="checkout-form" >
           <section className="checkout-form" >
            <h2>Customer Information </h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">
                        Full name
                        </label>
                        <input type="text"  id="name"  placeholder="Enter your full name" />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="email">
                                Email Address
                                </label>
                                <input type="email" id="email" placeholder="Enter your Email" /></div>
                                   <div className="form-group" >
                            <label htmlFor="phone">
                                Phone Number
                                </label>
                                <input type="tel" id="phone" placeholder="Enter your phone number" /></div>
                        <div className="form-group" >
                            <label htmlFor="address" >
                                Delivery Address </label>
                                <textarea id="address" placeholder="Enter your delivery address" rows="4"></textarea>
                                </div></form></section>
                            <section className="checkout-summary" >
                            <h2>Order Summary</h2>
                            {cart.map((item) => (
                                <div className="checkout-item" key={item.id}>
                                    <div><h3> {item.name}</h3>
                                    <p>{item.quantity} x ${item.price.toLocaleString()}</p>
                                    </div>
                                <strong>
                                    ${(
                                        item.price * item.quantity).toLocaleString()}
                                        </strong>
                                        </div> ))}

                                        <div className="checkout-total"><span>Total</span>
                                        <strong> ${subtotal.toLocaleString()}
                                            </strong>
                                            </div>
                                            <button className="place-order-button">
                                                Place order</button>
                                                </section>
                                                </div>
                                                </main>
                                    
                            );

}