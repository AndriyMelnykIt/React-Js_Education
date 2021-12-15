import React, { useMemo, useState } from 'react';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/MyModal/MyModal';
import MyButton from './Components/UI/button/MyButton';

function App () {
	const [posts, setPosts] = useState ([
		{id: 1, title: '3rw3r', body: 'rgd'},
		{id: 2, title: 'q2eq', body: 'w3rw3'},
		{id: 3, title: 'gdrgdr', body: 'rge'},
	])

	const [filter, setFilter] = useState ({sort: '', query: ''});
	const [modal, setModal] = useState (false);

	const sortedPosts = useMemo (() => {
		if (filter.sort) {
			return [...posts].sort ((a, b) => a[filter.sort].localeCompare (b[filter.sort]))
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo (() => {
		return sortedPosts.filter (post => post.title.toLowerCase ().includes (filter.query.toLowerCase ()))
	}, [filter.query, sortedPosts])

	const createPost = (newPost) => {
		setPosts ([...posts, newPost])
		setModal (false)
	}

	const removePost = (post) => {
		setPosts (posts.filter (p => p.id !== post.id))
	}

	return (
		<div className="App">
			<MyButton style={{marginTop: 30}} onClick={() => setModal (true)}>
				Створити користувача
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{margin: '15px 0'}} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Пости про Js" />
		</div>
	);
}

export default App;
