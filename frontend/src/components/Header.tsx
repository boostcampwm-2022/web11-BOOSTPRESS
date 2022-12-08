/* Header */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BasicInput, BasicShadowBox, zIndex } from 'styles/common';
import { ReactComponent as SearchIconSVG } from 'assets/svg/MagnifyingGlass.svg';
import { ReactComponent as UserIconSVG } from 'assets/svg/User.svg';
import { ReactComponent as GitHubIconSVG } from 'assets/svg/GithubIcon.svg';
import { ReactComponent as HomeSVG } from 'assets/svg/home.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil.svg';
import { css } from '@emotion/react';
import colors from 'styles/color';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from 'api/api';

interface headerType {
    isLogoActive: boolean;
    isSearchActive?: boolean;
}

// 로고는 안보일때도 있을 수 있음
const Header = ({ isLogoActive, isSearchActive = true }: headerType) => {
    const navigate = useNavigate();

    const [gitHubLoginModalActive, setGitHubLoginModalActive] = useState(false);
    const [userSettingModalActive, setuserSettingModalActive] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState<number>(0);

    const checkLogin = async () => {
        const res = await getUserInfo();
        if (res.nickname) {
            setIsLogin(true);
            setUserId(res.id);
        } else setIsLogin(false);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const handleGitHubLoginModal = () => {
        setGitHubLoginModalActive(!gitHubLoginModalActive);
    };

    const handleUserSettingModal = () => {
        setuserSettingModalActive(!userSettingModalActive);
    };

    const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
    };

    const moveGitHubAuth = () => {
        const url = process.env.REACT_APP_API_URL;
        window.location.href = `${url}/auth/github`;
    };

    const moveSearch = () => {
        navigate(`/search/${searchWord}`);
    };

    return (
        <HeaderWrapper>
            {isLogoActive ? (
                <Link to="/">
                    <LogoArea isLogoActive={isLogoActive}>
                        <LogoTitle>BOOSTPRESS</LogoTitle>
                    </LogoArea>
                </Link>
            ) : (
                <LogoArea isLogoActive={isLogoActive}>
                    <LogoTitle>BOOSTPRESS</LogoTitle>
                </LogoArea>
            )}

            <HeaderRightArea>
                {isSearchActive ? (
                    <>
                        <SearchArea
                            placeholder="검색어 입력 "
                            value={searchWord}
                            onChange={handleSearchWord}
                        />
                        <SearchIconSVG css={SearchIcon} onClick={moveSearch} />
                    </>
                ) : null}

                {isLogin ? (
                    // 유저이미지 부분으로 교체해야함 (현재 임시)
                    <UserImg
                        src={'https://picsum.photos/50'}
                        alt="유저이미지"
                        onClick={handleUserSettingModal}
                    />
                ) : (
                    <UserIconSVG
                        css={UserIcon}
                        onClick={handleGitHubLoginModal}
                    />
                )}

                <GitHubLoginArea
                    active={gitHubLoginModalActive}
                    onClick={moveGitHubAuth}
                >
                    <GitHubIconSVG />
                    <p>Github로 계속하기</p>
                </GitHubLoginArea>

                <UserSettingModalArea active={userSettingModalActive}>
                    <UserSettingModalItem to={`/blog/${String(userId)}`}>
                        <HomeSVG /> <p>내 블로그 페이지</p>
                    </UserSettingModalItem>
                    <UserSettingModalItem to="/">
                        <SettingSVG /> <p>내 블로그 설정</p>
                    </UserSettingModalItem>
                    <UserSettingModalItem to={`/newpost`}>
                        <PencilSVG /> <p>글 쓰기</p>
                    </UserSettingModalItem>
                </UserSettingModalArea>
            </HeaderRightArea>
        </HeaderWrapper>
    );
};

/* styled 부분 */
const HeaderWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 90%;
    left: 5%;
    top: 1rem;
    z-index: ${zIndex.header};
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

const UserImg = styled.img`
    cursor: pointer;
    margin-left: 1rem;
`;

const SearchArea = styled(BasicInput)`
    width: 358px;
    font-size: 15px;
    padding: 1rem;
`;

const SearchIcon = css`
    position: absolute;
    top: 0.7rem;
    left: 320px;
    cursor: pointer;
`;

const UserIcon = css`
    margin-left: 1rem;
    cursor: pointer;
`;

const GitHubLoginArea = styled(BasicShadowBox)<{ active: boolean }>`
    display: ${(props) => (props.active ? 'flex' : 'none')};
    align-content: center;
    position: absolute;
    right: 0;
    top: 4rem;
    padding: 1rem;

    p {
        padding: 1rem;
        font-family: 'Noto Sans';
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
    }
`;

const UserSettingModalArea = styled(BasicShadowBox)<{ active: boolean }>`
    display: ${(props) => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    align-content: center;

    width: 320px;
    position: absolute;
    right: 0;
    top: 4rem;
    padding: 0.5rem 1rem;
    color: ${colors.setting};
`;

const UserSettingModalItem = styled(Link)`
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
