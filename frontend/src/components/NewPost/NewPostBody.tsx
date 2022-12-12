import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import colors from 'styles/color';
import { Successbtn } from 'styles/common';
import { dateToStr } from 'utils/utils';
import MDXEditor from 'editor/MdxEditor';
import guideLine from 'editor/guideLine';
import { createArticle, updateArticle } from 'api/api';
import { useNavigate } from 'react-router-dom';
import TagSelector from './TagSelector';
import { tagType, categoryType, postType } from 'api/apiTypes';
import CategorySelector from './CategorySelector';

interface NewPostBodyPropsType {
    postInfo?: postType;
}

const NewPostBody = ({ postInfo }: NewPostBodyPropsType) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(postInfo ? postInfo.title : '');
    const [content, setContent] = useState(postInfo ? postInfo.content : '');
    const [selectedTags, setSelectedTags] = useState<tagType[]>(
        postInfo ? postInfo.tags : [],
    );
    const [selectedCategory, setSelectedCategory] = useState<categoryType>(
        {} as categoryType,
    );

    const [toggleActive, setToggleActive] = useState<
        '' | 'tag' | 'category' | 'series'
    >('');

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const submitPost = async () => {
        if (title === '') return alert('게시글의 제목을 입력해주세요!');

        const postData = {
            title,
            content,
            tagId: selectedTags.map((el) => el.id),
        };
        const res = postInfo
            ? await updateArticle(postData, postInfo.id)
            : await createArticle(postData);

        if (res.id) {
            if (postInfo) alert('글수정이 완료되었습니다');
            else alert('글쓰기가 완료되었습니다.');
            navigate('/');
        }
    };

    return (
        <NewPostBodyWrapper>
            <PostInfo>
                <Title
                    value={title}
                    placeholder="제목을 입력하세요"
                    onChange={handleTitle}
                />
                <PostInfoItem>
                    <TitleArea>
                        a<p>Posted Date : </p>
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
                            <span className="empty">태그 선택</span>
                        ) : (
                            selectedTags.map((tag) => (
                                <p key={tag.id}>{tag.name}</p>
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
                <PostInfoItem
                    onClick={() =>
                        setToggleActive((prev) =>
                            prev === 'category' ? '' : 'category',
                        )
                    }
                >
                    <TitleArea>
                        <p>Category : </p>
                        {selectedCategory.name ? (
                            <p>{selectedCategory.name}</p>
                        ) : (
                            <p className="empty">카테고리 선택</p>
                        )}
                    </TitleArea>
                    {toggleActive === 'category' ? (
                        <CategorySelector
                            setSelectedCategory={setSelectedCategory}
                            categories={[
                                {
                                    name: '상위',
                                    parentId: 0,
                                    id: 1,
                                    children: [
                                        {
                                            name: '하위1',
                                            parentId: 0,
                                            id: 2,
                                            children: [],
                                        },
                                        {
                                            name: '하위2',
                                            parentId: 0,
                                            id: 3,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    name: '하위없음',
                                    parentId: 0,
                                    id: 4,
                                    children: [],
                                },
                            ]}
                        />
                    ) : null}
                </PostInfoItem>
            </PostInfo>

            <EditorWrapper>
                <MDXEditor
                    guideLine={postInfo ? content : guideLine.testguide}
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
    border: 1px solid ${colors.boxGrayLine};

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
    color: #1e2222;
    .empty {
        color: ${colors.postDescription};
    }
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
