/* 포스트 상단 */
import styled from '@emotion/styled';
import { postType } from 'api/apiTypes';
import colors from 'styles/color';
import { PrimaryBtn } from 'styles/common';
import { dateToStr } from 'utils/utils';
import { ReactComponent as PencilSVG } from 'assets/svg/pencilPost.svg';
import { getUserInfo } from 'api/api';
import { useEffect, useState } from 'react';

interface PostHeadPropsType {
    postInfo: postType;
}

const PostHead = ({ postInfo }: PostHeadPropsType) => {
    const [isAuthor, setIsAuthor] = useState(false);

    const checkAuthor = async () => {
        const res = await getUserInfo();
        if (res.id === postInfo.author.id) setIsAuthor(true);
    };

    useEffect(() => {
        checkAuthor();
    }, []);

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
                    <p>{postInfo.tags?.map((el) => `${el.name} `)}</p>
                </TagArea>
                {isAuthor ? (
                    <EditBtn>
                        <PencilSVG stroke="white" />
                        편집
                    </EditBtn>
                ) : (
                    <></>
                )}
            </PostInfo>
        </>
    );
};

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    position: relative;
    margin-left: calc(20vw + 150px);
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
    p:first-of-type {
        margin-right: 0.5rem;
    }
`;

const DateArea = styled.p`
    display: flex;
    p {
        margin-right: 0.5rem;
    }
`;

const EditBtn = styled(PrimaryBtn)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 5rem;
    height: 2.5rem;
    gap: 0.5rem;
`;

export default PostHead;
