import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
		<div className='navbar'>
			<div className="navbar__links">
				<Link to="/about">Про сайт</Link>
				<Link to="/posts">Пости</Link>
			</div>
		</div>
	);

export default Navbar;
