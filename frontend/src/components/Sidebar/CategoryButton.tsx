import styled from '@emotion/styled/macro';
import { ReactComponent as MenuIconSVG } from 'assets/svg/menu.svg';
import { ReactComponent as PlusIconSVG } from 'assets/svg/plus.svg';
import { ReactComponent as MinusIconSVG } from 'assets/svg/minus.svg';
import { useState } from 'react';
import { categoryType } from 'api/apiTypes';

interface CategoryButtonProps {
    categoryObj: categoryType;
}
interface collapseButtonProps {
    isExpandable: boolean;
}
interface ButtonProps {
    depth: number;
}

const CategoryButton = ({ categoryObj }: CategoryButtonProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
    };
    const { name: categoryName, child, depth } = categoryObj;
    return (
        <Button depth={depth}>
            <Wrapper>
                <TitleArea>
                    <MenuIconSVG />
                    <CategoryName>{categoryName}</CategoryName>
                </TitleArea>
                <CollapseButtonArea
                    isExpandable={categoryObj.child.length !== 0}
                >
                    <CollapseButton onClick={toggleExpanded}>
                        {isExpanded ? <MinusIconSVG /> : <PlusIconSVG />}
                    </CollapseButton>
                </CollapseButtonArea>
            </Wrapper>
            {isExpanded &&
                child.map((category) => (
                    <CategoryButton categoryObj={category} />
                ))}
        </Button>
    );
};

const Button = styled.div<ButtonProps>`
    margin-left: ${(props) => (props.depth - 1) * 48}px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const TitleArea = styled.div`
    margin-left: 20px;
    display: flex;
    gap: 12px;
`;
const CategoryName = styled.h3`
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
`;
const CollapseButtonArea = styled.div<collapseButtonProps>`
    display: ${(props) => (props.isExpandable ? 'block' : 'none')};
`;
const CollapseButton = styled.button`
    background-color: transparent;
    border-width: 0;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    svg {
        width: 100%;
        height: 100%;
    }
`;

export default CategoryButton;
