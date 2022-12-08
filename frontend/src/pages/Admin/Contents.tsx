import styled from '@emotion/styled';
import { ReactComponent as MenuIconSVG } from 'assets/svg/menu.svg';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { PropsWithChildren, useState, useEffect } from 'react';
import { getCategoryByUserId, getUserInfo } from 'api/api';
import { categoryType } from 'api/apiTypes';

const ContentsManage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<categoryType[]>([]);

    const getCategories = async () => {
        const me = await getUserInfo();
        if (!me) {
            alert('로그인이 필요합니다!');
            navigate('/');
        }

        const data = await getCategoryByUserId(`${me.id}`);
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Wrapper>
            <DragDropContext onDragEnd={() => {}}>
                <CategoryRows>
                    {categories.map((category) => (
                        <CategoryManageRow
                            title={category.name}
                            key={category.id}
                        ></CategoryManageRow>
                    ))}
                </CategoryRows>
            </DragDropContext>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const CategoryRows = styled.div`
    background: #fcfcfc;
    border: 1px solid #d7d7d7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

interface CategoryManageRowProps extends PropsWithChildren {
    title: string;
}

const CategoryManageRow = ({ title, children }: CategoryManageRowProps) => {
    return (
        <CategoryManageRowWrapper>
            <MenuIconSVG />
            <CategoryName>{title}</CategoryName>
            <ButtonGroup>
                <Addbutton>추가</Addbutton>
                <RemoveButton>제거</RemoveButton>
            </ButtonGroup>
        </CategoryManageRowWrapper>
    );
};

const CategoryInput = () => {
    //TODO: 스타일 시트 작성해야 함
    const [categoryName, setCategoryName] = useState('');
    return (
        <CategoryManageRowWrapper>
            <MenuIconSVG />
            <CategoryNameInput
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <ButtonGroup>
                <Addbutton>추가</Addbutton>
                <RemoveButton>제거</RemoveButton>
            </ButtonGroup>
        </CategoryManageRowWrapper>
    );
};

const CategoryManageRowWrapper = styled.div`
    width: 654px;
    height: 64px;
    display: flex;
    align-items: center;
    position: relative;
`;

const CategoryNameInput = styled.input``;
const CategoryName = styled.span`
    margin-left: 5px;
`;

const ButtonGroup = styled.div`
    position: absolute;
    right: 24px;
    display: flex;
    gap: 16px;
`;

const Button = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        color: #fff;
    }
`;

const Addbutton = styled(Button)`
    border: 2px solid #4945ff;
    color: #4945ff;
    &:hover {
        background-color: #4945ff;
    }
`;
const RemoveButton = styled(Button)`
    border: 2px solid #d02b20;
    color: #d02b20;
    &:hover {
        background-color: #d02b20;
    }
`;

export default ContentsManage;
