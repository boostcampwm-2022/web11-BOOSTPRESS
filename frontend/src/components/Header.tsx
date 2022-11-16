/* Header */
import React from 'react';
import styled from '@emotion/styled';
import { BasicButton } from '../styles/common';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    padding: 1rem;
`;

type headerType = {
    isLogoActive: boolean;
};

const LogoArea = styled.div<headerType>`
    display: ${(props) => (props.isLogoActive ? 'default' : 'none')};
    font-weight: 700;
    font-size: 28px;
`;

const LogoTitle = styled.h1`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`;

const SearchArea = styled(BasicButton)`
    width: 358px;
    font-size: 15px;
    padding: 1rem;
`;

// 로고는 안보일때도 있을 수 있음
const Header = ({ isLogoActive }: headerType) => {
    return (
        <HeaderWrapper>
            <LogoArea isLogoActive={isLogoActive}>
                <LogoTitle>BOOSTPRESS</LogoTitle>
                The Ultimate Platform For Dev
            </LogoArea>
            <SearchArea placeholder="검색어 입력 " />
        </HeaderWrapper>
    );
};

export default Header;
