import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid, ThemeProvider, StyledEngineProvider } from '@mui/material';

import theme from './theme';
import Header from './components/Header';
import Main from './views/Main';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ErrorFallback from './components/ErrorBoundary';

import { ErrorBoundary } from 'react-error-boundary';
import { UserProvider } from './providers';
import { ModalProvider } from './providers/ModalProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              /* reset logic here */
            }}
          >
            <UserProvider>
              <ModalProvider>
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
                    {/* move modal to below footer after troubleshooting */}
                    <Modal />
                    <Header />
                    <Main />
                    <Footer />
                  </Grid>
                </BrowserRouter>
              </ModalProvider>
            </UserProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
