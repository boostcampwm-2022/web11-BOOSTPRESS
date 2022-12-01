/* 글 업데이트 */
import { useQuery } from '@tanstack/react-query';
import { getArticleInfo, getUserInfo } from 'api/api';
import Header from 'components/Header';
import NewPostBody from 'components/NewPost/NewPostBody';
import React from 'react';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const postId = useParams().postId as string;

    const postQuery = useQuery({
        queryKey: ['postInfo', postId],
        queryFn: () => getArticleInfo(postId),
    });

    return (
        <>
            <>
                <Header isLogoActive={true} />
                {postQuery.isLoading ? (
                    <span>Loading</span>
                ) : postQuery.isError ? (
                    <span>Error</span>
                ) : (
                    <NewPostBody postInfo={postQuery.data} />
                )}
            </>
        </>
    );
};

export default UpdatePost;
