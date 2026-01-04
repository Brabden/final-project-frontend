import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KeyboardList.css";
import { useCartContext } from "../context/CartContext";

interface Keyboard {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Props {
  searchTerm: string;
}

const KeyboardList: React.FC<Props> = ({ searchTerm }) => {
  const { addToCart } = useCartContext();
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/keyboards/")
      .then((response) => {
        setKeyboards(response.data);
        const initialQuantities: { [key: number]: number } = {};
        response.data.forEach((keyboard: Keyboard) => {
          initialQuantities[keyboard.id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleQuantityChange = (keyboardId: number, value: number) => {
    setQuantities({ ...quantities, [keyboardId]: value });
  };

  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const handleAddToCart = async (keyboardId: number) => {
    const quantity = quantities[keyboardId] || 1;
    await addToCart(keyboardId, quantity);
    setAddedToCart(keyboardId);
    setTimeout(() => {
      setAddedToCart(null);
    }, 1200);
  };

  const filteredKeyboards = keyboards.filter((keyboard) =>
    keyboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="keyboard-list">
      {filteredKeyboards.map((keyboard) => (
        <div key={keyboard.id} className="keyboard-card">
          <img
            className="keyboard-img"
            src={keyboard.image_url}
            alt={keyboard.name}
          />
          <div className="keyboard-info">
            <h3 className="keyboard-name">{keyboard.name}</h3>
            <p className="keyboard-description">{keyboard.description}</p>
            <div className="keyboard-price">${keyboard.price}</div>
          </div>
          <div>
            <div className="keyboard-actions">
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() =>
                    handleQuantityChange(
                      keyboard.id,
                      Math.max(1, (quantities[keyboard.id] || 1) - 1)
                    )
                  }
                >
                  {" "}
                  -{" "}
                </button>

                <span className="qty">{quantities[keyboard.id] || 1}</span>

                <button
                  className="qty-btn"
                  onClick={() =>
                    handleQuantityChange(
                      keyboard.id,
                      (quantities[keyboard.id] || 1) + 1
                    )
                  }
                >
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(keyboard.id)}
            >
              {addedToCart === keyboard.id ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyboardList;
