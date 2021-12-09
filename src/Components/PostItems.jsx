import React from 'react';

import '../styles/App.css'

const PostItems = (props) => {
	console.log (props);
	return (
		<div className="post">
			<div className="post__content">
				<strong>{props.number}. {props.post.title}</strong>
				<div>
					{props.post.body}
				</div>
			</div>
			<div className="post__btns">
				<button>Видалити</button>
			</div>
		</div>
	);
};

export default PostItems;
