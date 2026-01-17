import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KeyboardList.css";
import { Link } from "react-router-dom";

interface Keyboard {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Props {
  searchTerm: string;
  limit?: number;
  showDescription?: boolean;
}

const KeyboardList: React.FC<Props> = ({
  searchTerm,
  limit,
  showDescription = true,
}) => {
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/keyboards/")
      .then((response) => {
        setKeyboards(response.data);
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const filteredKeyboards = keyboards.filter((keyboard) =>
    keyboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedKeyboards = limit
    ? filteredKeyboards.slice(0, limit)
    : filteredKeyboards;

  return (
    <div className="keyboard-list">
      {displayedKeyboards.map((keyboard) => (
        <Link
          key={keyboard.id}
          to={`/keyboards/${keyboard.id}`}
          className="keyboard-card-link"
        >
          <div className="keyboard-card">
            <img
              className="keyboard-img"
              src={keyboard.image_url}
              alt={keyboard.name}
            />

            <div className="keyboard-info">
              <h3 className="keyboard-name">{keyboard.name}</h3>
              <p className="keyboard-description">
                {showDescription && keyboard.description}
              </p>
              <div className="keyboard-price">${keyboard.price}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default KeyboardList;
