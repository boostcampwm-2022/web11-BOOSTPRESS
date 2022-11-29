/*  */
import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import colors from 'styles/color';
import { Successbtn } from 'styles/common';

import { dateToStr } from 'utils/utils';
import MDXEditor from 'editor/MdxEditor';
import guideLine from 'editor/guideLine';
import { createArticle } from 'api/api';
import { useNavigate } from 'react-router-dom';
import TagSelector from './TagSelector';
import { tagType } from 'api/apiTypes';

const NewPostBody = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //태그,카테고리는 후에 선택
    const [selectedTags, setSelectedTags] = useState<tagType[]>([]);
    const [category, setCategory] = useState('');

    const [toggleActive, setToggleActive] = useState<
        '' | 'tag' | 'category' | 'series'
    >('');

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    console.log(toggleActive);

    const submitPost = async () => {
        const postData = {
            title,
            content,
        };
        const res = await createArticle(postData);
        console.log(selectedTags);

        if (res.id) {
            alert('글쓰기가 완료되었습니다');
            navigate('/');
        }
    };

    return (
        <NewPostBodyWrapper>
            <PostInfo>
                <Title placeholder="제목을 입력하세요" onChange={handleTitle} />
                <PostInfoItem>
                    <TitleArea>
                        <p>Posted Date : </p>
                        <DateArea>{dateToStr(new Date(), 'YYYYMMDD')}</DateArea>
                    </TitleArea>
                </PostInfoItem>
                <PostInfoItem>
                    <TitleArea
                        onClick={() =>
                            setToggleActive((prev) =>
                                prev === 'tag' ? '' : 'tag',
                            )
                        }
                    >
                        <p>Tag :</p>
                        {selectedTags.length === 0 ? (
                            <span>태그 선택</span>
                        ) : (
                            selectedTags.map((tag) => (
                                <p key={tag.id}>{tag.title}</p>
                            ))
                        )}
                    </TitleArea>
                    {toggleActive === 'tag' ? (
                        <TagSelector
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            onSaveClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setToggleActive('');
                            }}
                        />
                    ) : null}
                </PostInfoItem>
                <PostInfoItem onClick={() => setToggleActive('category')}>
                    <TitleArea>
                        <p>Category : </p>
                        <p>카테고리 선택</p>
                    </TitleArea>
                </PostInfoItem>
            </PostInfo>

            <EditorWrapper>
                <MDXEditor
                    guideLine={guideLine.testguide}
                    setContent={setContent}
                />
            </EditorWrapper>

            <SubmitButton onClick={submitPost}>글쓰기</SubmitButton>
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

const TitleArea = styled.div`
    display: flex;
`;

const PostInfoItem = styled.div`
    display: flex;
    flex-direction: column;
    color: ${colors.postDescription};
    margin: 0.3rem 0;

    ${TitleArea} {
        margin-top: 0.1rem;
    }
`;

const DateArea = styled.p`
    margin-left: 0.5rem;
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
