import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import theme from './Theme';

import Footer from './Footer';
import Header from './Header';
import Routes from './Routes';
import { UserProvider } from './providers';

import './App.css';


function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <BrowserRouter>
                    <div className="App">
                        <Header />
                        <Routes />
                        <Footer />
                    </div>
                </BrowserRouter>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
