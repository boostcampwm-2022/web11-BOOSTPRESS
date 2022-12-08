/* 검색 페이지 */
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getArticlesWithSearchWord } from 'api/api';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import PostGrid from 'components/PostGrid';
import SearchBar from 'components/Search/SearchBar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
    const initialSearchWord = useParams().query as string;
    const [pageIdx, setPageIdx] = useState(1);

    const [searchWord, setSearchWord] = useState(initialSearchWord);
    const articlesQuery = useQuery({
        queryKey: ['articles', initialSearchWord, pageIdx],
        queryFn: () => getArticlesWithSearchWord(initialSearchWord, pageIdx),
    });

    console.log(articlesQuery.data?.articles);

    return (
        <>
            <Header isLogoActive={true} isSearchActive={false} />
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
            {articlesQuery.isLoading ? (
                <span>Loading</span>
            ) : articlesQuery.isError ? (
                <span>Error</span>
            ) : (
                <CardWrapper>
                    <PostGrid postInfo={articlesQuery.data.articles} />
                    <Pagination
                        curPage={pageIdx}
                        maxPage={articlesQuery.data.totalPages}
                        setCurPage={setPageIdx}
                    />
                </CardWrapper>
            )}
        </>
    );
};

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    width: 80vw;
    align-items: center;
    margin: 0 auto;
`;

export default Search;
