
"use client" ;

import { createContext, useContext, useState, useEffect } from "react" ;
const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]) ;
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    useEffect(() => {
        try{
            const savedCart = localStorage.getItem("cart");

            if (savedCart){
                 setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setIsCartLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isCartLoaded){
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isCartLoaded]);

    const increaseQuantity = (productId) => {
        setCart((currentCart) => 
                    currentCart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item 
                 )
                );
               }
    const decreaseQuantity = (productId) => {
        setCart((currentCart) => 
         currentCart.map((item) =>   item.id === productId ? { ...item, quantity: item.quantity - 1 } : item 
            )
            .filter((item) => item.quantity > 0)
             );
    };
    const addToCart = (product) => {
        setCart((currentCart) => {
                    const existingProduct = currentCart.find(
                        (item) => item.id === product.id
                    );
             if (existingProduct) {
                        return currentCart.map((item) => 
                        item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item 
                );
             }
             return [
                ...currentCart,
                {
                    ...product,
                   quantity: 1,
                },
             ];
        });
    };
    const removeFromCart = (productId) => {
        setCart ((currentCart) => 
        currentCart.filter((item) => item.id !== productId )
    );
    };
    const clearCart = () => {
        setCart([]);
    };
    return (
        <CartContext.Provider 
        value={{
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
        }}
        >{children}
        </CartContext.Provider> );
        } 
export function useCart() {
    return useContext(CartContext);
}