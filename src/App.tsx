import React, {useEffect, useState} from 'react';
import axios from 'axios';
import KeyboardList from './components/KeyboardList';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
    return (
        <>
        <Navbar />
        <AppRoutes />
            <header>
                <h1>Keydom (Keyboard Kingdom)</h1>
            </header>
            <main>
                <KeyboardList />
            </main>
        </>
    );
};

export default App;