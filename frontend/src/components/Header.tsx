/* Header */
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BasicInput, BasicShadowBox } from 'styles/common';
import { ReactComponent as SearchIconSVG } from 'assets/svg/MagnifyingGlass.svg';
import { ReactComponent as UserIconSVG } from 'assets/svg/User.svg';
import { ReactComponent as GitHubIconSVG } from 'assets/svg/GithubIcon.svg';
import { ReactComponent as HomeSVG } from 'assets/svg/home.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil.svg';
import { css } from '@emotion/react';
import colors from 'styles/color';

interface headerType {
    isLogoActive: boolean;
    isLogin: boolean;
}

// 로고는 안보일때도 있을 수 있음
const Header = ({ isLogoActive, isLogin }: headerType) => {
    const [gitHubLoginModalActive, setGitHubLoginModalActive] = useState(false);
    const [userSettingModalActive, setuserSettingModalActive] = useState(false);

    const handleGitHubLoginModal = () => {
        setGitHubLoginModalActive(!gitHubLoginModalActive);
    };

    const handleUserSettingModal = () => {
        setuserSettingModalActive(!userSettingModalActive);
    };

    return (
        <HeaderWrapper>
            <LogoArea isLogoActive={isLogoActive}>
                <LogoTitle>BOOSTPRESS</LogoTitle>
            </LogoArea>
            <HeaderRightArea>
                <SearchArea placeholder="검색어 입력 " />
                <SearchIconSVG css={SearchIcon} />
                {isLogin ? (
                    // 유저이미지 부분으로 교체해야함 (현재 임시)
                    <div
                        css={css`
                            cursor: pointer;
                        `}
                        onClick={handleUserSettingModal}
                    >
                        유저이미지
                    </div>
                ) : (
                    <UserIconSVG
                        css={UserIcon}
                        onClick={handleGitHubLoginModal}
                    />
                )}

                <GitHubLoginArea Active={gitHubLoginModalActive}>
                    <GitHubIconSVG />
                    <p>Github로 계속하기</p>
                </GitHubLoginArea>

                <UserSettingModalArea Active={userSettingModalActive}>
                    <UserSettingModalItem>
                        <HomeSVG /> <p>내 블로그 페이지</p>
                    </UserSettingModalItem>
                    <UserSettingModalItem>
                        <SettingSVG /> <p>내 블로그 설정</p>
                    </UserSettingModalItem>
                    <UserSettingModalItem>
                        <PencilSVG /> <p>글 쓰기</p>
                    </UserSettingModalItem>
                </UserSettingModalArea>
            </HeaderRightArea>
        </HeaderWrapper>
    );
};

/* styled 부분 */
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    padding: 1rem;
`;

const LogoArea = styled.div<{ isLogoActive: boolean }>`
    visibility: ${(props) => (props.isLogoActive ? 'default' : 'hidden')};
    font-weight: 700;
    font-size: 28px;
`;

const LogoTitle = styled.h1`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`;

const HeaderRightArea = styled.div`
    display: flex;
    position: relative;
    align-items: center;
`;

const SearchArea = styled(BasicInput)`
    width: 358px;
    font-size: 15px;
    padding: 1rem;
`;

const SearchIcon = css`
    position: absolute;
    top: 1rem;
    left: 350px;
    cursor: pointer;
`;

const UserIcon = css`
    margin-left: 1rem;
    cursor: pointer;
`;

const GitHubLoginArea = styled(BasicShadowBox)<{ Active: boolean }>`
    display: ${(props) => (props.Active ? 'flex' : 'none')};
    align-content: center;
    position: absolute;
    right: 0;
    top: 5rem;
    padding: 1rem;

    p {
        padding: 1rem;
        font-family: 'Noto Sans';
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
    }
`;

const UserSettingModalArea = styled(BasicShadowBox)<{ Active: boolean }>`
    display: ${(props) => (props.Active ? 'flex' : 'none')};
    flex-direction: column;
    align-content: center;

    width: 320px;
    position: absolute;
    right: 0;
    top: 5rem;
    padding: 0.5rem 1rem;
    color: ${colors.setting};
`;

const UserSettingModalItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    :hover {
        background: ${colors.settingHover};
    }

    p {
        padding: 1rem 0.5rem;
    }
`;

export default Header;
