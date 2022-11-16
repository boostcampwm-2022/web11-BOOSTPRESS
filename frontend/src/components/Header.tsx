/* Header */
import React from 'react';
import { css } from '@emotion/css';
import { btnST } from '../styles/common';

type headerType = {
    isLogoActive: boolean;
};

// 로고는 안보일때도 있을 수 있음
const Header = ({ isLogoActive }: headerType) => {
    return (
        <>
            <div className={headerST}>
                <div className={logoST(isLogoActive)}>
                    <p className={logoTitleST}>BOOSTPRESS</p>
                    The Ultimate Platform For Dev
                </div>
                <input className={searchBtnST} placeholder="검색어 입력 " />
            </div>
        </>
    );
};

const headerST = css`
    display: flex;
    justify-content: space-between;

    padding: 1rem;
`;

const logoST = (isLogoActive: boolean) => {
    return css`
        display: ${isLogoActive ? 'default' : 'none'};
        font-weight: 700;
        font-size: 28px;
    `;
};

const logoTitleST = css`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`;

const searchBtnST = css`
    ${btnST};
    width: 358px;
    font-size: 15px;
    padding: 1rem;
`;

export default Header;
