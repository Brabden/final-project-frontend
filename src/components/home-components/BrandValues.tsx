import "./BrandValues.css";

const BrandValues: React.FC = () => {
  return (
    <section className="values">
        <h2 className="brand-header">our brand values</h2>
      <div className="values-grid">
        <div className="value-item">
          <img
            src="https://external-preview.redd.it/8Otk7BnbFYDNirSAEoWaiPPsFUb0gV-5L9LtVyoJCcA.jpg?auto=webp&s=5ce05ca9a27c62b64b0821b93bb77a726dbe19ae"
            alt="value-image1"
          />
          <h3>minimal design</h3>
          <p>
            clean layouts and neutral tones, designed to stay out of your way.{" "}
          </p>
        </div>
        <div className="value-item">
          <img
            src="https://t3.ftcdn.net/jpg/16/12/71/00/360_F_1612710081_IkxoAYVyYZWEGf91xinCjmbVW19mLMIM.jpg"
            alt="value-image2"
          />
          <h3>built to last</h3>
          <p>quality materials and thoughtful construction.</p>
        </div>

        <div className="value-item">
          <img
            src="https://m.media-amazon.com/images/I/71RVnzqye8L.jpg"
            alt="value-image3"
          />
          <h3>everyday comfort</h3>
          <p>designed for long sessions and daily use.</p>
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
