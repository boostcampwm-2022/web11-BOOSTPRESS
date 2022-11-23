import styled from '@emotion/styled/macro';
import { ReactComponent as ChevronLeft } from 'assets/svg/ChevronLeft.svg';
import { ReactComponent as ChevronRight } from 'assets/svg/ChevronRight.svg';

interface PaginationProps {
    curPage: number;
    maxPage: number;
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ curPage, maxPage, setCurPage }: PaginationProps) => {
    return (
        <Wrapper>
            <NavigationButton onClick={() => setCurPage((prev) => prev - 1)}>
                <ChevronLeft />
            </NavigationButton>
            {[...Array(Math.min(3, curPage - 1))].map((_, idx) => (
                <PageButton onClick={() => setCurPage(idx + 1)}>
                    {idx + 1}
                </PageButton>
            ))}
            {3 + 1 < curPage && curPage - 2 > 3 && <Break>...</Break>}

            {curPage - 1 > 1 + 2 && (
                <PageButton onClick={() => setCurPage(curPage - 1)}>
                    {curPage - 1}
                </PageButton>
            )}
            <SelectedPageButton>{curPage}</SelectedPageButton>
            {curPage + 1 <= maxPage && (
                <PageButton onClick={() => setCurPage(curPage + 1)}>
                    {curPage + 1}
                </PageButton>
            )}

            {maxPage - 2 > curPage && <Break>...</Break>}
            {maxPage > curPage + 1 && (
                <PageButton onClick={() => setCurPage(maxPage)}>
                    {maxPage}
                </PageButton>
            )}
            <NavigationButton onClick={() => setCurPage((prev) => prev + 1)}>
                <ChevronRight />
            </NavigationButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    gap: 2px;
`;
const NavigationButton = styled.button`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PageButton = styled.button`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    border-radius: 4px;
    &:hover {
        background: #fff;
        box-shadow: 0px 1px 4px rgba(26, 26, 67, 0.1);
    }
`;
const Break = styled(PageButton)``.withComponent('div');
const SelectedPageButton = styled(PageButton)`
    color: #271fe0;
    font-weight: 700;
    background: #fff;
    box-shadow: 0px 1px 4px rgba(26, 26, 67, 0.1);
`.withComponent('div');

export default Pagination;
