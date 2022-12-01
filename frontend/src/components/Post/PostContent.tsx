/* post 컨텐트 */
import styled from '@emotion/styled';
import { evaluateSync } from '@mdx-js/mdx';
import mdxComponents from 'editor/mdxComponent';
import React, { createElement } from 'react';
import * as runtime from 'react/jsx-runtime';
import colors from 'styles/color';

const generate = (body: string) => {
    const mdx = evaluateSync(body, {
        ...(runtime as any),
    }).default;

    return createElement(mdx);
};

interface PostContentPropsType {
    content: string | undefined;
}

const PostContent = ({ content }: PostContentPropsType) => {
    return (
        <ContentArea className="markdown-body">
            {generate(mdxComponents + content)}
        </ContentArea>
    );
};

const ContentArea = styled.div`
    width: 60vw;
    margin-left: calc(20vw + 150px);
    margin-top: 3rem;
    margin-bottom: 3rem;
    position: relative;
    padding: 3rem;
    border: 1px solid ${colors.boxGrayLine};
    line-height: 22px;
`;

export default PostContent;
