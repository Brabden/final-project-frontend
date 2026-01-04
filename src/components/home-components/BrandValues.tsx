import "./BrandValues.css";

const BrandValues: React.FC = () => {
  return (
    <section className="values">
      <div className="values-grid">
        <div className="values-grid">
          <div className="value-item">
            <img src="" alt="" />
            <h3>minimal design</h3>
            <p>
              clean layouts and neutral tones, designed to stay out of your way.{" "}
            </p>
          </div>
          <div className="value-item">
            <img src="" alt="" />
            <h3>built to last</h3>
            <p>quality materials and thoughtful construction.</p>
          </div>

          <div className="value-item">
            <img src="" alt="" />
            <h3>everyday comfort</h3>
            <p>designed for long sessions and daily use.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
