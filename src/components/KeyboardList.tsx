import React, { useEffect, useState } from "react";
import axios from "axios";

interface Keyboard {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const KeyboardList: React.FC = () => {
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/keyboards/")
      .then((response) => {setKeyboards(response.data);
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
  const handleAddToCart = (keyboardId: number) => {
    const quantity = quantities[keyboardId] || 1;
    axios
      .post("http://localhost:8000/cart/add_to_cart/", {
        product_id: keyboardId,
        quantity: quantity,
      })
      .then(() => setAddedToCart(keyboardId))
      .catch((error) => {
        console.error("Error adding to cart", error);
        alert("Failed to add to cart.");
      });
  };

  return (
    <div>
      <h2>Newly Arrived Keyboards</h2>
      <div>
        {keyboards.map((keyboard) => (
          <div key={keyboard.id}>
            <h3>{keyboard.name}</h3>
            <img
              className="keyboard-img"
              src={keyboard.image_url}
              alt={keyboard.name}
            />
            <p>{keyboard.description}</p>
            <span>${keyboard.price}</span>
            <div>
              <label>
                Quantity:
                <select
                value={quantities[keyboard.id]}
                onChange={(e) => handleQuantityChange(keyboard.id, parseInt(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleAddToCart(keyboard.id)}>
                {addedToCart === keyboard.id ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardList;
