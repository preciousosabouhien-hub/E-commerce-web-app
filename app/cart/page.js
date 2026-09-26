"use client";
 import { useCart } from "../../context/CartContext";

 export default function CartPage()
 {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, } = useCart();

                return (
                            <main className="cart-page">
                                <h1>Your Cart</h1>
                                {cart.length === 0 ? (<p> Your cart is empty.</p> ): 
                                ( 
                                            <div className="cart-items"> 
                                                    {cart.map((item) => (
                                                                            <div className="cart-item" key={item.id}>
                                                                            <img src={item.image} alt={item.name} />
                                                                            
                                                                            <div> <h2>{item.name}</h2>
                                                                            <p> ${item.price.toLocaleString()} </p>
                                                                            <p> Quantity: </p><div className="quantity-controls"><button onClick={() => 
                                                                                decreaseQuantity(item.id)}> - </button> <span>
                                                                                {item.quantity}</span> <button onClick={() => increaseQuantity(item.id)}> + </button></div>
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
