import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Navbar from './Components/UI/Navbar/Navbar';
import AppRouter from './Components/AppRouter';

import './styles/App.css'

const App = () => (
	<BrowserRouter>
		<Navbar />
		<AppRouter />
	</BrowserRouter>
);

export default App;
