import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import "./ProductPage.css";

interface Keyboard {
  id: number;
  name: string;
  summary: string;
  price: number;
  image_url: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartContext();
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/keyboards/${id}/`)
      .then((response) => setKeyboard(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, [id]);

  if (!keyboard) return <p>loading product...</p>;

  const handleAddToCart = async () => {
    await addToCart(keyboard.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={keyboard.image_url} alt={keyboard.name} />
      </div>

      <div className="product-info">
        <h1 className="product-name">{keyboard.name}</h1>
        <p className="product-summary">{keyboard.summary}</p>
        <div className="summary-divider" />
        <div className="product-price">
          ${keyboard.price}
          <span className="price-underline" />
        </div>
        <div className="product-actions">
          <div className="quantity-controls">
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>

            <span className="qty">{quantity}</span>

            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            {added ? "added" : "add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
