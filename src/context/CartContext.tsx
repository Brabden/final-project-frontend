import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface CartItem {
  id: number;
  product: string;
  quantity: number;
  price: number;
  total_price: number;
  image_url: string;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  fetchCart: () => void;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchCart = () => {
    return axios.get("http://localhost:8000/cart/get_cart/").then((res) => {
      setCartItems(
        res.data.cart_items.map((item: any) => ({
          ...item,
          price: Number(item.price),
          total_price: Number(item.total_price),
        }))
      );
      setTotalPrice(Number(res.data.total_price));
    });
  };

  const addToCart = async (productId: number, quantity: number) => {
    await axios.post("http://localhost:8000/cart/add_to_cart/", {
      product_id: productId,
      quantity,
    });
    fetchCart();
  };

  const removeFromCart = async (itemId: number) => {
    await axios.delete(
      `http://localhost:8000/cart/remove_from_cart/${itemId}/`
    );
    fetchCart();
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    await axios.post(`http://localhost:8000/cart/update_quantity/${itemId}/`, {
      quantity,
    });
    fetchCart();
  };

  const clearCart = async() => {
    await axios.post("http://localhost:8000/cart/clear/");
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used inside CartProvider");
  return context;
};
