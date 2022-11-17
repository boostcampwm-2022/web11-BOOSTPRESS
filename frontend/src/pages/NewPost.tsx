/* 글쓰기 페이지 */
import Header from 'components/Header';
import NewPostBody from 'components/NewPostBody';
import React from 'react';

const NewPost = () => {
    return (
        <>
            <Header isLogoActive={true} isLogin={true} />
            <NewPostBody />
        </>
    );
};

export default NewPost;
