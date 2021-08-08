import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes';

import './App.css';

function App(): JSX.Element {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
