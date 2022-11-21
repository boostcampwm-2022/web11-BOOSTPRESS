import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { ReactComponent as SettingIconSVG } from 'assets/svg/setting.svg';
import { ReactComponent as GithubIconSVG } from 'assets/svg/github.svg';
import { ReactComponent as MailIconSVG } from 'assets/svg/mail.svg';
import { ReactComponent as TwitterIconSVG } from 'assets/svg/twitter.svg';
import { ReactComponent as LinkedinIconSVG } from 'assets/svg/linkedin.svg';
import Collapsible from './Sidebar/Collapsible';
import CategoryButton from './Sidebar/CategoryButton';
import { PlainBtn } from 'styles/common';

const SidebarComponent = () => {
    const categories = [
        {
            id: 1,
            name: '확장가능',
            depth: 1,
            child: [{ id: 1, name: '하위1', depth: 2, child: [] }],
        },
        {
            id: 1,
            name: '확장불가',
            depth: 1,
            child: [],
        },
    ];
    const tags = [
        { name: '태그1호', article_count: 1 },
        { name: '태그2호', article_count: 2 },
    ];
    return (
        <Sidebar>
            <TitleArea>
                <BlogName>홍길동의 블로그</BlogName>
                <CreditSection>with boostpress</CreditSection>
            </TitleArea>
            <NameCard>
                <Name>John doe</Name>
                <Bio>
                    <p>날 어떻게 한줄로 소개해</p>
                </Bio>
                <ProfileImage src="https://picsum.photos/75" />
                <SocialInfos>
                    <Link to="#">
                        <GithubIconSVG />
                    </Link>
                    <Link to="#">
                        <MailIconSVG />
                    </Link>
                    <Link to="#">
                        <TwitterIconSVG />
                    </Link>
                    <Link to="#">
                        <LinkedinIconSVG />
                    </Link>
                </SocialInfos>
            </NameCard>
            <Menu>
                <SideBarPlainButton>전체 글 보기</SideBarPlainButton>
                <Collapsible title="카테고리">
                    {categories.map((category) => (
                        <CategoryButton categoryObj={category} />
                    ))}
                </Collapsible>
                <Collapsible title="태그">
                    <Tags>
                        {tags.map((tag) => (
                            <Tag>{`${tag.name}(${tag.article_count})`}</Tag>
                        ))}
                    </Tags>
                </Collapsible>
            </Menu>
            <BlogConfig>
                <SettingIconSVG />
                <p>블로그 관리</p>
            </BlogConfig>
        </Sidebar>
    );
};

const Sidebar = styled.nav`
    position: relative;
    width: 300px;
    height: 100vh;
    border-right: 1px solid #d8d8d8;
`;

const BlogName = styled.h1``;

const CreditSection = styled.h4``;

const TitleArea = styled.section`
    display: flex;
    flex-direction: column;
    gap: 3px;
    color: #3c403d;
    margin-top: 30px;
    margin-left: 27px;
    ${BlogName} {
        font-family: 'Rajdhani';
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 36px;
    }
    ${CreditSection} {
        font-family: 'Rajdhani';
        text-transform: uppercase;
    }
`;

const Name = styled.h3``;
const ProfileImage = styled.img``;
const Bio = styled.div``;
const SocialInfos = styled.div``;

const NameCard = styled.header`
    position: relative;
    margin-top: 20px;
    padding: 24px;
    padding-bottom: 0px;
    display: flex;
    min-height: 100px;
    flex-direction: column;
    border-radius: 9px;
    border: 1px solid #d8d8d8;
    ${Name} {
        font-family: 'IBM Plex Mono';
        color: #272738;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
    }
    ${ProfileImage} {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 75px;
        height: 75px;
        border-radius: 50%;
    }
    ${Bio} {
        font-size: 14px;
        line-height: 24px;
    }
    ${SocialInfos} {
        margin-top: 10px;
        display: flex;
        gap: 10px;
        & > svg {
            width: 24px;
            height: 24px;
        }
    }
`;

const SideBarPlainButton = styled(PlainBtn)`
    padding-left: 12px;
    display: flex;
    align-items: center;
    width: 100%;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
`;

const BlogConfig = styled(SideBarPlainButton)`
    position: absolute;
    gap: 16px;
    bottom: 0px;
    border-radius: 0;
`;

const Menu = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Tags = styled.div`
    display: flex;
    flex-direction: column;
`;

const Tag = styled(SideBarPlainButton)`
    font-weight: 500;
    font-size: 16px;
`;

export default SidebarComponent;
