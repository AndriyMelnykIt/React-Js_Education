import React, { useEffect, useMemo, useState } from 'react';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/MyModal/MyModal';
import MyButton from './Components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './Components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';

function App () {
	const [posts, setPosts] = useState ([])
	const [filter, setFilter] = useState ({sort: '', query: ''});
	const [modal, setModal] = useState (false);
	const sortedAndSearchedPosts = usePosts (posts, filter.sort, filter.query);
	const [fetchPost, isPostsLoading, postError] = useFetching (async () => {
		const posts = await PostService.getAll ();
		setPosts (posts)
	})

	useEffect (() => {
		fetchPost ()
	}, [])

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
			{postError &&
				<h1>Виникла помилка ${postError}</h1>
			}
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Пости про Js" />
			}
		</div>
	);
}

export default App;
