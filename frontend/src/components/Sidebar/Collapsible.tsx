import { PropsWithChildren, useState } from 'react';
import styled from '@emotion/styled/macro';
import { ReactComponent as ChevronUpSVG } from 'assets/svg/ChevronUp.svg';
import { PlainBtn } from 'styles/common';

interface Props extends PropsWithChildren {
    title: string;
}

interface ToggleProps {
    isOpen: boolean;
}

const Collapsible = ({ title, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <TitleArea
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}
            >
                <Title>{title}</Title>
                <ToggleButton isOpen={isOpen} />
            </TitleArea>
            <Content isOpen={isOpen}>{children}</Content>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleArea = styled(PlainBtn)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
`.withComponent('header');

const Title = styled.h3`
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
`;

const ToggleButton = styled(ChevronUpSVG)<ToggleProps>`
    transition: transform 0.5s;
    transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Content = styled.div<ToggleProps>`
    overflow-y: hidden;
    max-height: ${(props) => (props.isOpen ? 'fit-content' : 0)};
`;

export default Collapsible;
