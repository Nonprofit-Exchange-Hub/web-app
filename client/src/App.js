import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import Footer from "./Footer.js";
import Header from "./Header.js";
import Routes from './Routes';

import './App.css';


function App() {
	const theme = useTheme();
	// const [ data, setData ] = React.useState(null);

	// React.useEffect(() => {
	// 	fetch('http://localhost:3001/user/8').then((res) => res.json()).then((data) => setData(JSON.stringify(data)));
	// }, []);

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
