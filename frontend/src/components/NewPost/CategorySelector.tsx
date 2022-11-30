import styled from '@emotion/styled';
import { ReactComponent as MenuSVG } from 'assets/svg/menu.svg';
import { categoryType } from 'api/apiTypes';

interface Props {
    categories: categoryType[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<categoryType>>;
}

const CategorySelector = ({ categories, setSelectedCategory }: Props) => {
    return (
        <Wrapper>
            {categories.map((category) => (
                <CategoryRow
                    depth={1}
                    category={category}
                    setSelectedCategory={setSelectedCategory}
                />
            ))}
        </Wrapper>
    );
};

const CategoryRow = ({
    category,
    depth,
    setSelectedCategory,
}: {
    category: categoryType;
    depth: number;
    setSelectedCategory: React.Dispatch<React.SetStateAction<categoryType>>;
}) => {
    return (
        <RowWrapper>
            <TitleWrapper
                depth={depth}
                onClick={() => setSelectedCategory(category)}
            >
                <MenuSVG />
                <TitleText>{category.name}</TitleText>
            </TitleWrapper>
            {category.children.map((child) => (
                <CategoryRow
                    depth={depth + 1}
                    category={child}
                    setSelectedCategory={setSelectedCategory}
                />
            ))}
        </RowWrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    border: 1px solid #d7d7d7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const TitleWrapper = styled.button<{ depth: number }>`
    width: 100%;
    padding: 16px 0;
    padding-left: ${(prop) => prop.depth * 10}px;
    display: flex;
    gap: 5px;
    border-bottom: 1px solid #d7d7d7;
`;
const TitleText = styled.span`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #1e2222;
`;

const RowWrapper = styled.div``;
export default CategorySelector;
