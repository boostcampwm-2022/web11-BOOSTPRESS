import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { ReactComponent as SettingIconSVG } from 'assets/svg/setting.svg';
import { ReactComponent as MenuIconSVG } from 'assets/svg/menu.svg';
import { ReactComponent as PlusIconSVG } from 'assets/svg/plus.svg';
import { ReactComponent as ChevronUpIconSVG } from 'assets/svg/chevronUp.svg';
import { ReactComponent as ChevronDownIconSVG } from 'assets/svg/chevronDown.svg';
import { ReactComponent as GithubIconSVG } from 'assets/svg/github.svg';
import { ReactComponent as MailIconSVG } from 'assets/svg/mail.svg';
import { ReactComponent as TwitterIconSVG } from 'assets/svg/twitter.svg';
import { ReactComponent as LinkedinIconSVG } from 'assets/svg/linkedin.svg';
import Collapsible from './Collapsible';

const SidebarComponent = () => {
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
                <Collapsible title="lorem">
                    <div>qdb</div>
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

const BlogConfig = styled.div`
    position: absolute;
    width: 300px;
    height: 60px;
    bottom: 0px;
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: 'Manrope';
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    border-top: 1px solid #d8d8d8;
    padding-left: 12px;
`;

const Menu = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default SidebarComponent;
