import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './Theme';
import Footer from './features/Footer';
import Header from './features/Header';
import Main from './features/Main';
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
