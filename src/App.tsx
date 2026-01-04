import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import MiniCart from './components/MiniCart';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
    const [refreshNavbar, setRefreshNavbar] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartProvider>
        <Navbar refresh={refreshNavbar}
        onCartClick={() => setIsCartOpen(true)}
        />
        <MiniCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        />
        <AppRoutes onLogin={() => setRefreshNavbar(prev => !prev)} />
        </CartProvider>
    );
};

export default App;