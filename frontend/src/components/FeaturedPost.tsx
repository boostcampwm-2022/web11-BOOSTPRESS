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
            <Title>{title}</Title>
            <PostCardWrap>
                {postInfo.map((post) => (
                    <PostCard postInfo={post} width="100%" height="300px" />
                ))}
            </PostCardWrap>
        </>
    );
};

const Title = styled.p`
    margin: 5rem;
    margin-left: 10%;
    font-weight: 700;
    font-size: 1.2rem;
`;

//그리드로 width에 따라 카드수가 달라지게
const PostCardWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 230px));
    width: 80%;
    margin: 0 auto;
    row-gap: 2rem;
    column-gap: 3rem;
`;

export default FeaturedPost;
