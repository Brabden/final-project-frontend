import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartItem {
    id: number;
    product: string;
    quantity: number;
    price: number;
    total_price: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    axios.get("http://localhost:8000/cart/get_cart/")
      .then((response) => {
        setCartItems(response.data.cart_items);
        setTotalPrice(response.data.total_price);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart.");
      });
  }, []);

  const handleRemoveFromCart = (itemId: number) => {
    axios
      .delete(`http://localhost:8000/cart/remove_from_cart/${itemId}/`)
      .then(() => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);

        const updatedTotalPrice = updatedCartItems.reduce(
            (acc, item) => acc + item.total_price,
            0
        );
        setTotalPrice(updatedTotalPrice)
      })
      .catch((error) => {
        console.error(
          "There was an error removing the item from the cart",
          error
        );
      });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h3>
                  {item.product} - {item.quantity} x ${item.price}
                </h3>
                <p>Total: ${item.total_price}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove Item
                </button>
              </li>
            ))}
          </ul>
          <h2>Total Price : ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
