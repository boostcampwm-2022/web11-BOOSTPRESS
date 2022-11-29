/* 추천(인기순,조회순 등)에 따른 게시글 출력 */
import styled from '@emotion/styled';
import { postCardInfoType } from 'api/apiTypes';
import React from 'react';
import PostCard from './PostCard';

interface PostGridType {
    postInfo: postCardInfoType[];
    title?: string;
}

const PostGrid = ({ postInfo, title }: PostGridType) => {
    return (
        <>
            {title ? <Title>{title}</Title> : null}
            <PostCardWrap>
                {postInfo.map((post) => (
                    <PostCard postInfo={post} width="100%" height="300px" />
                ))}
            </PostCardWrap>
        </>
    );
};

const Title = styled.p`
    margin-top: 5rem;
    margin-left: 10%;
    font-weight: 700;
    font-size: 1.2rem;
`;

//그리드로 width에 따라 카드수가 달라지게
const PostCardWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 230px));
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    margin-top: 5rem;
    row-gap: 2rem;
    column-gap: 3rem;
`;

export default PostGrid;
