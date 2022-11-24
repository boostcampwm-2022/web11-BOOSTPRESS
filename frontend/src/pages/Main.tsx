/* Main 페이지 */
import React from 'react';
import Header from 'components/Header';
import IntroBanner from 'components/IntroBanner';
import { getFeaturePostInfo } from 'api/api';
import { useQuery } from '@tanstack/react-query';
import PostGrid from 'components/PostGrid';

const Main = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['recentPosts'],
        queryFn: getFeaturePostInfo,
    });
    return (
        <>
            <Header isLogoActive={true} isLogin={true} />
            <IntroBanner isLogin={true} />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error</span>
            ) : (
                <PostGrid postInfo={data.articles} />
            )}
        </>
    );
};

export default Main;
