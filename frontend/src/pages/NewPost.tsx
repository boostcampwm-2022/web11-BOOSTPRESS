/* 게시물 글쓰기 */
import Header from 'components/Header';
import NewPostBody from 'components/NewPost/NewPostBody';
import React from 'react';

const NewPost = () => {
    return (
        <>
            <Header isLogoActive={true} />
            <NewPostBody />
        </>
    );
};

export default NewPost;
