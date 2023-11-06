import { BrowserRouter } from 'react-router-dom';
import { Grid, ThemeProvider, StyledEngineProvider } from '@mui/material';

import theme from './theme';
import Header from './components/Header';
import Main from './views/Main';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GeneralError from './components/ErrorBoundary/GeneralError';
import NotFound from './components/ErrorBoundary/NotFoundError';

import { UserProvider } from './providers';
import { ModalProvider } from './providers/ModalProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import { SettingsProvider } from './providers/SettingsProvider';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ErrorBoundary fallback={GeneralError}>
            <UserProvider>
              <SettingsProvider>
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
                      <Header />
                      <ErrorBoundary fallback={NotFound}>
                        <Main />
                      </ErrorBoundary>
                      <Footer />
                      <Modal />
                    </Grid>
                  </BrowserRouter>
                </ModalProvider>
              </SettingsProvider>
            </UserProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
