import { useState } from 'react';
import styled from '@emotion/styled/macro';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Sidebar from 'components/Sidebar';
import { getBlogSideBarInfo, getArticlesWithUserId } from 'api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostGrid from 'components/PostGrid';

const BlogMain = () => {
    const userId = useParams().userId as string;
    const [pageIdx, setPageIdx] = useState(1);
    const sideBarQuery = useQuery({
        queryKey: ['blogSideBar', userId],
        queryFn: () => getBlogSideBarInfo(userId),
    });
    const articlesQuery = useQuery({
        queryKey: ['articles', userId, pageIdx],
        queryFn: () => getArticlesWithUserId(userId),
    });
    return (
        <Wrapper>
            <Header isLogoActive={false} isLogin={false} />
            {sideBarQuery.isLoading ? (
                <span>Loading</span>
            ) : sideBarQuery.isError ? (
                <span>Error</span>
            ) : (
                <Sidebar blogSideBarInfo={sideBarQuery.data} />
            )}
            <Main>
                {articlesQuery.isLoading ? (
                    <span>Loading</span>
                ) : articlesQuery.isError ? (
                    <span>Error</span>
                ) : (
                    <PostGrid postInfo={articlesQuery.data.articles} />
                )}
                <Pagination
                    curPage={pageIdx}
                    maxPage={5}
                    setCurPage={setPageIdx}
                />
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
`;

const Main = styled.main`
    align-self: flex-end;
    height: calc(100vh - 140px);
    width: calc(100vw - 300px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
    div:first-child {
        justify-content: center;
    }
    .pagination {
        align-self: center;
        bottom: 80px;
    }
`;

export default BlogMain;
