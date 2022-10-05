import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from './theme';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './views/Main';
import { UserProvider } from './providers';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
