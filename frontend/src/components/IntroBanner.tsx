/* 메인페이지 배너 */
import React from 'react';
import { ReactComponent as LoadingSVG } from 'assets/svg/spinner.svg';
import { ReactComponent as GitHubSVG } from 'assets/svg/GitHubIconBlack.svg';
import styled from '@emotion/styled';
import colors from 'styles/color';

interface IntroBannerType {
    isLogin: boolean;
}

const IntroBanner = ({ isLogin }: IntroBannerType) => {
    return (
        <>
            <BannerWrapper>
                <BannerTextArea>
                    <Title>
                        <span>The Ultimate</span> Platform <span>For Dev</span>
                    </Title>
                    <Description>
                        블라블라 어쩌구저쩌구 설명블라블라 어쩌구저쩌구
                    </Description>
                </BannerTextArea>
                <LoadingSVG />
                <GitHubBtn isLogin={isLogin}>
                    <GitHubSVG stroke="black" />
                    GitHub로 로그인
                </GitHubBtn>
            </BannerWrapper>
        </>
    );
};

/* styled 부분 */
const BannerWrapper = styled.div`
    display: flex;
    padding: 10rem 0;
    padding-bottom: 12rem;
    position: relative;
    background: ${colors.bannerBackground};
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
`;

const BannerTextArea = styled.div`
    color: white;
    margin-right: 5rem;
`;

const Title = styled.header`
    font-size: 2.5rem;
    font-weight: 700;
    width: 400px;
    span:first-of-type {
        color: #46dff0;
    }
    span:last-of-type {
        color: #e90c59;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    margin-top: 1rem;
    width: 240px;
`;

const GitHubBtn = styled.button<{ isLogin: boolean }>`
    display: ${(props) => (props.isLogin ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 32px;

    position: absolute;
    bottom: 5rem;
    margin-top: 1rem;
    background-color: black;
    transition: 0.3s;
    font-size: 0.8rem;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
`;

export default IntroBanner;
