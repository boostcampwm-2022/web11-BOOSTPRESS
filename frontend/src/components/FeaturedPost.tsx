/* 추천(인기순,조회순 등)에 따른 게시글 출력 */
import styled from '@emotion/styled';
import { postCardInfoType } from 'api/apiTypes';
import React from 'react';
import PostCard from './PostCard';

interface FeaturePostType {
    title: string;
    postInfo: postCardInfoType[];
}

const FeaturedPost = ({ title, postInfo }: FeaturePostType) => {
    return (
        <>
            <Title>인기 게시글</Title>
            <PostCardWrap>
                {postInfo.map((post) => (
                    <PostCard postInfo={post} width="200" />
                ))}
            </PostCardWrap>
        </>
    );
};

const Title = styled.p`
    margin: 5rem;
    font-weight: 700;
`;

const PostCardWrap = styled.div``;

export default FeaturedPost;
