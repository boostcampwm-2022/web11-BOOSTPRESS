/* 포스트 카드형식 컴포넌트 */
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React from 'react';
import colors from '../styles/color';
import { dateToStrMMDD } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

type postCardType = {
    //이미지는 파일자체를 받을건지, url주소로 할껀지 결정해야함
    img: string;
    title: string;
    category: string;
    date: Date;
    writer: string;
    postUrl: string;
    width: string;
};

const PostCard = ({
    img,
    title,
    category,
    date,
    writer,
    postUrl,
    width,
}: postCardType) => {
    const navigate = useNavigate();

    return (
        <PostCardWrapper width={width} onClick={() => navigate(postUrl)}>
            {/* 추후에 이미지로 변경 */}
            <div
                css={css`
                    background: yellowgreen;
                    height: 115px;
                `}
            ></div>
            <DescriptionArea>
                <p>{`[ ${category} ]`}</p>
                <Title>{title}</Title>
                <BottomInfo date={date} writer={writer}>
                    {dateToStrMMDD(date)} · {writer}
                </BottomInfo>
            </DescriptionArea>
        </PostCardWrapper>
    );
};

const PostCardWrapper = styled.div<{ width: string }>`
    position: relative;
    width: ${(props) => `${props.width}px`};
    height: 284px;
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

const Title = styled.p`
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
