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

import Modal from './components/Modal/Modal';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const [isShown, setModalShown] = React.useState<boolean>(false);
  const handleToggleModal = () => {
    setModalShown((prevModalStatus) => !prevModalStatus);
  };
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <ThemeProvider theme={theme}>
      {isShown && <Modal isShown={isShown} setModalShown={setModalShown} />}
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
              <Header onClick={handleToggleModal} />
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
