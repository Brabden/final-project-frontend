import { Routes, Route } from "react-router-dom";
import Shop from "../pages/Shop";
import About from "../pages/About"
import Support from "../pages/Support"
import Cart from "../pages/Cart"
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";

interface AppRoutesProps {
    onLogin?: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onLogin }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/signup" element={<Signup onLogin={onLogin} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="keyboards/:id" element={<ProductPage />} />
        </Routes>
    );
};

export default AppRoutes;

