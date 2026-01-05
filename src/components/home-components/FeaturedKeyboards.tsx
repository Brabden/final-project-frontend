import "./FeaturedKeyboards.css";
import KeyboardList from "../KeyboardList";

const FeaturedKeyboards: React.FC = () => {
  return (
    <section className="featured">
      <h2 className="section-title">featured products</h2>
      <KeyboardList searchTerm="" limit={5} showActions={false} />
    </section>
  );
};

export default FeaturedKeyboards;
 