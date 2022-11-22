/*  */
import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/color';
import { dateToStrYYYYMMDD } from 'utils/utils';

const NewPostBody = () => {
    return (
        <NewPostBodyWrapper>
            <PostInfo>
                <Title placeholder="제목을 입력하세요" />
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
        </NewPostBodyWrapper>
    );
};

const NewPostBodyWrapper = styled.div`
    margin-top: 8rem;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
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

export default NewPostBody;
