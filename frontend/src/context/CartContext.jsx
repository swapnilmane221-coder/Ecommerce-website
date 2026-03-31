import { createContext, useContext, useState, useEffect } from "react";
import { authFetch,getAccessToken } from "../utils/auth";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  //Fetch Cart from Backend
  const fetchCart = async () => {
    try {
      const response = await authFetch(`${BASEURL}/api/cart/`);
      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // useEffect(() => {
  //     const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //     setTotal(newTotal);
  // }, [cartItems]);

  const addToCart = async (productID) => {
    try {
      await authFetch(`${BASEURL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productID,
          quantity: 1,
        }),
      });  
          fetchCart();
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: itemId,
        }),
      });
      fetchCart();
      
      // fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      await authFetch(`${BASEURL}/api/cart/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: itemId,
          quantity: quantity,
        }),
      });
      fetchCart();
      
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
 
    const clearCart = () => {
      setCartItems([]);
      setTotal(0);
    }

  return (
    <CartContext.Provider
      value={{ cartItems, total,addToCart, removeFromCart, updateQuantity,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
