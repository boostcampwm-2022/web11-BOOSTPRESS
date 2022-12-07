import styled from '@emotion/styled';
import { ReactComponent as SettingPageIcon } from 'assets/svg/settingPageIcon.svg';
import { ReactComponent as UserIcon } from 'assets/svg/smallusericon.svg';
import { ReactComponent as MenuIcon } from 'assets/svg/listcomponent.svg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === '/admin') {
            navigate('personalInfo');
        }
    }, [navigate]);
    return (
        <Wrapper>
            <Sidebar>
                <HeadingSection>
                    <SettingPageIcon />
                    <HeadingTitleSection>
                        <HeadingTitle>관리자 페이지</HeadingTitle>
                        <ReturnToMyBlog to="#">
                            블로그로 이동하기
                        </ReturnToMyBlog>
                    </HeadingTitleSection>
                </HeadingSection>
                <MenuNavigation>
                    <ul>
                        <MenuItem to="personalInfo">
                            <UserIcon />
                            개인정보 관리
                        </MenuItem>
                        <MenuItem to="contents">
                            <MenuIcon />
                            컨텐츠 관리
                        </MenuItem>
                    </ul>
                </MenuNavigation>
            </Sidebar>
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #fafafa;
    height: 100%;
    display: flex;
`;
const Sidebar = styled.div`
    width: 225px;
    position: fixed;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-right: 1px solid #eaeaef;
    height: 100vh;
`;
const HeadingSection = styled.header`
    display: flex;
    gap: 8px;
    padding-left: 12px;
    font-family: 'Noto Sans KR';
    margin: 20px 12px;
    height: fit-content;
`;
const HeadingTitleSection = styled.div``;
const HeadingTitle = styled.h1`
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
`;
const ReturnToMyBlog = styled(Link)`
    color: #3182ce;
    font-size: 12px;
    text-decoration: underline;
    &:hover {
        font-weight: 500;
    }
`;
const MenuNavigation = styled.nav`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

const MenuItem = styled(Link)`
    width: 196px;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    padding-left: 12px;
    gap: 12px;
    border-radius: 4px;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #666687;
    &:hover {
        background-color: #c5dcfa;
    }
`;

const ContentWrapper = styled.main`
    margin-left: 225px;
`;

export default Admin;
