import { useState } from 'react';
import { ReactComponent as SaveIconSVG } from 'assets/svg/save.svg';
import styled from '@emotion/styled';

const TagSelector = () => {
    const [numberOfSelectedTags, setNumberOfSelectedTags] = useState(0);
    const [searchBarContent, setSearchBarContent] = useState('');
    return (
        <Wrapper>
            <Section>
                <SectionTitle>
                    선택된 태그 ({numberOfSelectedTags}/10)
                </SectionTitle>
                <TagsGrid>{[...Array(3)].fill(<Tag>태그{1}</Tag>)}</TagsGrid>
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
                <TagsGrid>{[...Array(9)].fill(<Tag>태그{1}</Tag>)}</TagsGrid>
            </Section>
            <SaveButton>
                <SaveIconSVG />
                <span>저장</span>
            </SaveButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
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
