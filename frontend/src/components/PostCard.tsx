/* 포스트 카드형식 컴포넌트 */
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/color';
import { dateToStrMMDD } from 'utils/utils';
import { Link } from 'react-router-dom';
import { postCardInfoType } from 'api/apiTypes';

interface postCardType {
    postInfo: postCardInfoType;
    width: string;
    height: string;
}

const PostCard = ({ postInfo, width, height }: postCardType) => {
    return (

        <PostCardWrapper width={width} height={height}>
            <Link to={postInfo.postURL}>

                {/* 추후에 이미지로 변경 */}
                <img src={postInfo.imgURL} alt="게시글이미지" />
                <DescriptionArea>
                    <p>{`[ ${postInfo.category} ]`}</p>
                    <Title>{postInfo.title}</Title>
                    <BottomInfo
                        date={new Date(postInfo.date)}
                        writer={postInfo.authorId}
                    >
                        {dateToStrMMDD(new Date(postInfo.date))} ·{' '}
                        {postInfo.authorId}
                    </BottomInfo>
                </DescriptionArea>
            </Link>
        </Wrapper>
    );
};


interface PostCardWrapperType {
    width: string;
    height: string;
}

const PostCardWrapper = styled.div<PostCardWrapperType>`

    position: relative;
    width: ${(props) => `${props.width}`};
    height: ${(props) => `${props.height}`};
    color: white;
    background: ${colors.cardBackground};
    cursor: pointer;
`;

const DescriptionArea = styled.div`
    padding: 1rem;
    font-weight: 700;
    font-size: 19px;
    p:first-of-type {
        margin-bottom: 0.3rem;
    }
`;

const Title = styled.header`
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;

    line-height: 1.3em;
`;

const BottomInfo = styled.div<{ date: Date; writer: string }>`
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    font-weight: 500;
`;

export default PostCard;
