import { Link } from "react-router-dom";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>keyboards, refined.</h1>
        <p>
          minimal mechanical keyboards designed for comfort, focus and
          everyday use.
        </p>
        <Link to="/shop" className="primary-btn">
          shop keyboards
        </Link>
      </div>
    </section>
  );
};

export default Hero;
