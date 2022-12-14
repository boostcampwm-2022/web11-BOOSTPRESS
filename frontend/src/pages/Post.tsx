/* 게시글 조회 페이지 */
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getArticleInfo, getBlogSideBarInfo, getUserInfo } from 'api/api';
import Header from 'components/Header';
import PostContent from 'components/Post/PostContent';
import PostHead from 'components/Post/PostHead';
import SidebarComponent from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Utterances } from 'utterances-react-component';

const Post = () => {
    const navigate = useNavigate();
    const postId = useParams().postId as string;
    const [userId, setUserId] = useState('');

    const postQuery = useQuery({
        queryKey: ['postInfo', postId],
        queryFn: async () => {
            const data = await getArticleInfo(postId);
            if (data !== null) setUserId(`${data.author.id}`);
            return data;
        },
    });

    const sideBarQuery = useQuery({
        queryKey: ['blogSideBar', userId],
        queryFn: () => getBlogSideBarInfo(userId),
    });

    useEffect(() => {
        if (postQuery.data?.author) setUserId(String(postQuery.data.author.id));
        if (postQuery.data?.message) {
            alert('존재하지 않는 게시글입니다');
            navigate('/');
        }
    }, [postQuery]);

    return (
        <Wrapper>
            <Header isLogoActive={false} />
            {sideBarQuery.isLoading || userId === '' ? (
                <span>Loading</span>
            ) : sideBarQuery.isError ? (
                <span>Error</span>
            ) : (
                <SideBarWrapper>
                    <SidebarComponent
                        userId={userId}
                        blogSideBarInfo={sideBarQuery.data}
                    />
                </SideBarWrapper>
            )}
            <PostBody>
                {postQuery.isLoading ? (
                    <span>Loading</span>
                ) : postQuery.isError ? (
                    <span>Error</span>
                ) : (
                    <PostHead postInfo={postQuery.data} />
                )}
                <PostContent content={postQuery.data?.content} />
            </PostBody>
            <Utterances
                repo="BoostPress/comments"
                issueTerm="pathname"
                theme="github-light"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SideBarWrapper = styled.div`
    position: fixed;
    top: -1.5rem;
`;

const PostBody = styled.div`
    margin-top: 10rem;
`;

export default Post;
