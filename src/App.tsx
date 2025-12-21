import React, {useEffect, useState} from 'react';
import axios from 'axios';
import KeyboardList from './components/KeyboardList';

const App: React.FC = () => {
    return (
        <div>
            <header>
                <h1>Keydom (Keyboard Kingdom)</h1>
            </header>
            <main>
                <KeyboardList />
            </main>
        </div>
    );
};

export default App;