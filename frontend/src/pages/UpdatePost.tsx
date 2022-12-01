/* 글 업데이트 */
import { useQuery } from '@tanstack/react-query';
import { getArticleInfo, getUserInfo } from 'api/api';
import Header from 'components/Header';
import NewPostBody from 'components/NewPost/NewPostBody';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const navigate = useNavigate();
    const postId = useParams().postId as string;

    const postQuery = useQuery({
        queryKey: ['postInfo', postId],
        queryFn: () => getArticleInfo(postId),
    });

    useEffect(() => {
        if (postQuery.data?.message) {
            alert('존재하지 않는 게시글입니다');
            navigate('/');
        }
    }, [postQuery]);

    const checkIsAuthor = async () => {
        const user = await getUserInfo();
        if (postQuery.data) {
            if (user.id !== postQuery.data.author.id) {
                alert('수정 권한이 없습니다');
                navigate('/');
            }
        }
    };

    useEffect(() => {
        checkIsAuthor();
    }, [postQuery]);

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
