/*  */
import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import colors from 'styles/color';
import { Successbtn } from 'styles/common';
import { dateToStrYYYYMMDD } from 'utils/utils';
import Editor from './Editor';
import 'styles/editor.css';
import TagSelector from './TagSelector';
import { tagType } from 'api/apiTypes';

const NewPostBody = () => {
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
    return (
        <NewPostBodyWrapper>
            <PostInfo>
                <Title placeholder="제목을 입력하세요" onChange={handleTitle} />
                <PostInfoItem>
                    <TitleArea>
                        <p>Posted Date : </p>
                        <p>&nbsp;{dateToStrYYYYMMDD(new Date())}</p>
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
                <div className="markdown-body">
                    <Editor content={content} setContent={setContent} />
                </div>
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

const EditorWrapper = styled.div`
    width: 80%;
    margin: 3rem auto;
`;

const SubmitButton = styled(Successbtn)`
    width: 200px;
    height: 30px;
    margin: 0 auto;
    color: white;
    margin-bottom: 15rem;
`;

export default NewPostBody;
