/* 검색창 */
import styled from '@emotion/styled';
import React from 'react';
import { BasicInput } from 'styles/common';
import { ReactComponent as SearchIconSVG } from 'assets/svg/MagnifyingGlass.svg';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    searchWord: string;
    setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchWord, setSearchWord }: SearchBarProps) => {
    const navigate = useNavigate();

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
    };

    const search = () => {
        navigate(`${searchWord}`);
    };

    return (
        <Wrapper>
            <SearchArea value={searchWord} onChange={handleTitle} />
            <SearchIcon onClick={search} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    width: 50%;
    margin: 10rem auto;
`;

const SearchArea = styled(BasicInput)`
    width: 100%;
    height: 5rem;
    font-size: 15px;
    padding: 1rem;

    border: 2px solid black;
`;

const SearchIcon = styled(SearchIconSVG)`
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    cursor: pointer;
`;

export default SearchBar;
