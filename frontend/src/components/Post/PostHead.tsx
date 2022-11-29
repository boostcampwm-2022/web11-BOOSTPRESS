/* 포스트 상단 */
import styled from '@emotion/styled';
import { evaluateSync } from '@mdx-js/mdx';
import { postType } from 'api/apiTypes';
import mdxComponents from 'editor/mdxComponent';
import * as runtime from 'react/jsx-runtime';
import React, { createElement } from 'react';
import colors from 'styles/color';
import { dateToStr } from 'utils/utils';

const generate = (body: string) => {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
    }).default;

    return createElement(mdx);
};

interface PostHeadPropsType {
    postInfo: postType;
}

const PostHead = ({ postInfo }: PostHeadPropsType) => {
    return (
        <>
            <PostInfo>
                <Title>{postInfo.title}</Title>
                <DateArea>
                    <p>Posted date : </p>
                    {dateToStr(new Date(postInfo.updatedAt), 'YYYYMMDD')}
                </DateArea>
                <TagArea>
                    <p>tag : </p>
                    <p>{postInfo.tagId}</p>
                </TagArea>
            </PostInfo>
            <ContentArea>
                {generate(mdxComponents + postInfo.content)}
            </ContentArea>
        </>
    );
};

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    margin-left: calc(20vw - 150px);
    padding: 2rem 3rem;
    border: 1px solid #d8d8d8;
`;

const Title = styled.div`
    margin-bottom: 1rem;
    border: none;
    color: ${colors.postTitle};
    font-size: 2rem;
    font-weight: 700;
`;

const TagArea = styled.div`
    display: flex;
`;

const DateArea = styled.p`
    display: flex;
    p {
        margin-right: 0.5rem;
    }
`;

const ContentArea = styled.div`
    width: 60vw;
    margin-left: calc(20vw - 150px);
    margin-top: 3rem;
    position: relative;
    padding: 3rem;
    border: 1px solid ${colors.boxGrayLine};
`;

export default PostHead;
