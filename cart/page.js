"use client";
 import { useCart } from "../../context/CartContext";
 import "../global.css" ;

 export default function CartPage(){
    const { cart, removeFromCart } = useCart();

                return (
                            <main className="cart-page">
                                <h1 className="cart-Title">Your Cart</h1>
                                {cart.length === 0 ? (<p> Your cart is empty.</p> ) : ( <div className="cart-items"> 
                                                    {cart.map((item) => (
                                                                            <div className="cart-item" key={item.id}>
                                                                            <img src={item.image} alt={item.name} />
                                                                            
                                                                            <div> <h2>{item.name}</h2>
                                                                            <p > {item.price.toLocaleString()} </p>
                                                                            <p className="quantity"> Quantity: {item.quantity}</p>
                                                                            <button onClick={() => removeFromCart(item.id)} >
                                                                                Remove </button>
                                                                                </div>
                                                                                </div>
                                                                        )
                                                            )
                                                    }
                                        </div>
                                    )
                                }
                            </main>
                       );
}
