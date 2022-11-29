import React, { useState } from 'react';
import { ReactComponent as SaveIconSVG } from 'assets/svg/save.svg';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getAllTags } from 'api/api';
import { tagType } from 'api/apiTypes';

interface Props {
    selectedTags: tagType[];
    setSelectedTags: React.Dispatch<React.SetStateAction<tagType[]>>;
    onSaveClick: (e: React.MouseEvent) => void;
}

const TagSelector = ({ selectedTags, setSelectedTags, onSaveClick }: Props) => {
    const tagQuery = useQuery({ queryKey: ['tags'], queryFn: getAllTags });
    const [searchBarContent, setSearchBarContent] = useState('');

    const handleTagSelection = (selectedTag: tagType) => {
        setSelectedTags((prev) => [...prev, selectedTag]);
    };
    const handleTagUnSelection = (selectedTag: tagType) => {
        const filteredSelected = selectedTags.filter(
            (tag) => tag.id !== selectedTag.id,
        );
        setSelectedTags(filteredSelected);
    };

    return (
        <Wrapper>
            {tagQuery.isLoading ? (
                <span>loading</span>
            ) : tagQuery.isError ? (
                <span>error</span>
            ) : (
                <>
                    <Section>
                        <SectionTitle>
                            선택된 태그 ({selectedTags.length}/10)
                        </SectionTitle>
                        <TagsGrid>
                            {tagQuery.data.tags
                                .filter((tag) =>
                                    selectedTags.find(
                                        (selectedTag) =>
                                            selectedTag.id === tag.id,
                                    ),
                                )
                                .map((tag) => (
                                    <Tag
                                        id={tag.id}
                                        onClick={() =>
                                            handleTagUnSelection(tag)
                                        }
                                    >
                                        {tag.name}
                                    </Tag>
                                ))}
                        </TagsGrid>
                    </Section>
                    <Section>
                        <SectionTitle>태그 입력</SectionTitle>
                        <SearchBar
                            placeholder="태그 검색"
                            value={searchBarContent}
                            onChange={(e) => {
                                setSearchBarContent(e.target.value);
                            }}
                        />

                        <TagsGrid>
                            {tagQuery.data.tags
                                .filter((tag) => !selectedTags.includes(tag))
                                .map((tag) => (
                                    <Tag
                                        id={tag.id}
                                        onClick={() => handleTagSelection(tag)}
                                    >
                                        {tag.name}
                                    </Tag>
                                ))}
                        </TagsGrid>
                    </Section>
                    <SaveButton onClick={onSaveClick}>
                        <SaveIconSVG />
                        <span>저장</span>
                    </SaveButton>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 405px;
    padding: 20px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const SectionTitle = styled.h3`
    margin-bottom: 5px;
`;
const SearchBar = styled.input`
    width: 320px;
    align-self: center;
    outline: 1px solid #e8e8e8;
    border-radius: 5px;
    padding: 5px 10px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    color: #000;
    &:placeholder {
        color: #b0b0b0;
    }
`;
const TagsGrid = styled.div`
    display: grid;
    width: 364px;
    gap: 5px 2px;
    grid-template-columns: repeat(3, 120px);
`;
const Tag = styled.button`
    width: 120px;
    height: 30px;
    padding: 0 10px;
    background: #e9ecf3;
    border-radius: 3px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
`;

const SaveButton = styled.button`
    align-self: center;
    width: 52px;
    height: 26px;
    background: #328048;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 16px;
    color: #fff;
`;

export default TagSelector;
