import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Routes from './Routes';

function App() {
	const [ data, setData ] = React.useState(null);

	React.useEffect(() => {
		fetch('http://localhost:3001/user/8').then((res) => res.json()).then((data) => setData(JSON.stringify(data)));
	}, []);

	return (
		<BrowserRouter>
			<div className="App">
				<Routes />
			</div>
		</BrowserRouter>
	);
}

export default App;
