/*  */
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'styles/color';
import { Successbtn } from 'styles/common';
import { dateToStrYYYYMMDD } from 'utils/utils';
import mdxEditor from 'editor/editor';
import MDXEditor from 'editor/mdxEditor';

const NewPostBody = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //태그,카테고리는 후에 선택
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState('');

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <NewPostBodyWrapper>
            <PostInfo>
                <Title placeholder="제목을 입력하세요" onChange={handleTitle} />
                <PostInfoItem>
                    <p>Posted Date : </p>
                    <p>&nbsp;{dateToStrYYYYMMDD(new Date())}</p>
                </PostInfoItem>
                <PostInfoItem>
                    <p>Tag :</p>
                    <p>태그 선택</p>
                </PostInfoItem>
                <PostInfoItem>
                    <p>Category : </p>
                    <p>카테고리 선택</p>
                </PostInfoItem>
            </PostInfo>

            <EditorWrapper>
                <MDXEditor />
            </EditorWrapper>

            <SubmitButton>글쓰기</SubmitButton>
        </NewPostBodyWrapper>
    );
};

const NewPostBodyWrapper = styled.div`
    margin-top: 8rem;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: auto;
    padding: 2rem 3rem;
    border: 1px solid #d8d8d8;

    input {
        border: none;
    }
`;

const Title = styled.input`
    margin-bottom: 1rem;
    border: none;
    color: ${colors.postTitle};
    font-size: 2rem;
    font-weight: 700;
`;

const PostInfoItem = styled.div`
    display: flex;
    color: ${colors.postDescription};
    margin: 0.3rem 0;

    p:nth-of-type(2) {
        margin-top: 0.1rem;
    }
`;

const EditorWrapper = styled.div`
    width: 80%;
    margin: 3rem auto;
    position: relative;
`;

const SubmitButton = styled(Successbtn)`
    width: 200px;
    height: 30px;
    margin: 0 auto;
    color: white;
    margin-bottom: 15rem;
`;

export default NewPostBody;
