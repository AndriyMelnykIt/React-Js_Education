import React, { useRef, useState } from 'react';

import PostList from './Components/PostList';
import MyButton from './Components/UI/button/MyButton';
import MyInput from './Components/UI/input/MyInput';

function App () {
	const [posts, setPosts] = useState ([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'JavaScript 2', body: 'Description'},
		{id: 3, title: 'JavaScript 3', body: 'Description'},
	])

	const [post, setPost] = useState ({title: '', body: ''});

	const addNewPost = (e) => {
		e.preventDefault ()
		setPosts([...posts, {...post, id: Date.now()}])
		setPost({title: '', body: ''})
	}

	return (
		<div className="App">
			<form>
				<MyInput
					value={post.title}
					onChange={e => setPost ({...post, title: e.target.value})}
					type="text"
					placeholder="Назва поста"
				/>
				<MyInput
					value={post.body}
					onChange={e => setPost ({...post, body: e.target.value})}
					type="text"
					placeholder="Опис поста"
				/>
				<MyButton onClick={addNewPost}>Створити пост</MyButton>
			</form>
			<PostList posts={posts} title="Пости про Js"/>
		</div>
	);
}

export default App;
