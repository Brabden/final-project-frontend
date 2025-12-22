import React, {useEffect, useState} from 'react';
import axios from 'axios';

const KeyboardList: React.FC = () => {
  const [keyboards, setKeyboards] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/keyboards/")
    .then(response => {
      setKeyboards(response.data);
    })
    .catch(error => {
      console.error("Error fetching products", error);
    });
  }, []);

  return (
    <div>
      <h2>Newly Arrived Keyboards</h2>
      <div>
        {keyboards.map((keyboard) => (
          <div key={keyboard.id}>
            <h3>{keyboard.name}</h3>
            <img className="keyboard-img" src={keyboard.image_url} alt={keyboard.name} />
            <p>{keyboard.description}</p>
            <span>${keyboard.price}</span>
            <button>Add to Cart</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardList;