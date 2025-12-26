import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
    return (
        <>
        <Navbar />
        <AppRoutes />
        </>
    );
};

export default App;