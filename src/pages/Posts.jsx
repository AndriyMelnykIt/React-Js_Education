import React, { useEffect, useState } from 'react';

import MyButton from '../Components/UI/button/MyButton';
import MyModal from '../Components/UI/MyModal/MyModal';
import PostForm from '../Components/PostForm';
import PostFilter from '../Components/PostFilter';
import Loader from '../Components/UI/Loader/Loader';
import PostList from '../Components/PostList';

import { usePosts } from '../hooks/usePosts';
import { getPageCount, getPagesArray } from '../utils/pages';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';


function Posts () {
	const [posts, setPosts] = useState ([])
	const [filter, setFilter] = useState ({sort: '', query: ''});
	const [modal, setModal] = useState (false);
	const [totalPages, setTotalPages] = useState (0);
	const [limit, setLimit] = useState (10);
	const [page, setPage] = useState (1);
	const sortedAndSearchedPosts = usePosts (posts, filter.sort, filter.query);
	let pagesArray = getPagesArray (totalPages);

	const [fetchPost, isPostsLoading, postError] = useFetching (async () => {
		const response = await PostService.getAll (limit, page);
		setPosts (response.data)
		const totalCount = (response.headers['x-total-count']);
		setTotalPages (getPageCount (totalCount, limit))
	})

	useEffect (() => {
		fetchPost ()
	}, [page])

	const createPost = (newPost) => {
		setPosts ([...posts, newPost])
		setModal (false)
	}

	const removePost = (post) => {
		setPosts (posts.filter (p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage (page)
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
			<div className='page__wrapper'>
				{pagesArray.map (p =>
					<span
						onClick={() => changePage (p)}
						key={p}
						className={page === p ? 'page page__current' : 'page'}
					>
						{p}
					</span>
				)}
			</div>
		</div>
	);
}

export default Posts;
