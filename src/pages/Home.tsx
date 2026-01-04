import Hero from "../components/home-components/Hero";
import BrandValues from "../components/home-components/BrandValues";
import FeaturedKeyboards from "../components/home-components/FeaturedKeyboards";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedKeyboards />
      <BrandValues />
    </main>
  );
};

export default Home;
