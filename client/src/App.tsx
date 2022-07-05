import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from './Theme';
import Footer from './views/Footer';
import Header from './views/Header';
import Main from './views/Main';
import { UserProvider } from './providers';

import './App.css';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter
          getUserConfirmation={() => {
            // intentionally left empty callback to block the default browser prompt.
          }}
        >
          <div className="App">
            <Header />
            <Main />
            <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
