import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './Theme';
import Footer from './features/Footer';
import Header from './features/Header';
import Main from './features/Main';
import { UserProvider } from './providers';

import './App.css';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
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
