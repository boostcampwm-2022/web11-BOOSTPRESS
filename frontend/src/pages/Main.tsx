/* Main 페이지 */
import React from 'react';
import Header from 'components/Header';
import IntroBanner from 'components/IntroBanner';
import FeaturedPost from 'components/FeaturedPost';
import { getFeaturePostInfo } from 'api/api';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['recentPosts'],
        queryFn: getFeaturePostInfo,
    });
    return (
        <>
            <Header isLogoActive={true} isLogin={true} />
            {/* <PostCard
            <PostCard
                img="test"
                title="TITLE! dasfsadfasdf안ㄴ여TITLE!!! dasfsadfasdf Hello안녕RaaR"
                category="Category"
                date={new Date('2022-11-17')}
                writer="정민규"
                postUrl="http://www.naver.com"
                width="224"

            /> */}
            <IntroBanner isLogin={true} />
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error</span>
            ) : (
                <FeaturedPost title="" postInfo={data.articles} />
            )}
        </>
    );
};

export default Main;
