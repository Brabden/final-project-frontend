import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About"
import Support from "../pages/Support"
import Cart from "../pages/Support"

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default AppRoutes;

