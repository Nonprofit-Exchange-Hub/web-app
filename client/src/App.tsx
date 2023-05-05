import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid, ThemeProvider } from '@mui/material';

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
            <Grid
              className="App"
              display="flex"
              flexDirection="column"
              height="100vh"
              width="100vw"
              justifyContent="space-between"
            >
              <Header />
              <Main />
              <Footer />
            </Grid>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
