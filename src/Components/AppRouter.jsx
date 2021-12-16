import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';

const AppRouter = () => (
		<div>
			<Routes>
				<Route>
					<Route path={'/About'} element={<About />} />
					<Route path={'/Posts'} element={<Posts />} />
					<Route path={'/error'} element={<Error />} />
				</Route>
			</Routes>
		</div>
	);

export default AppRouter;
