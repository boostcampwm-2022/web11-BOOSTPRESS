/* Main 페이지 */
import React from 'react';
import Header from 'components/Header';
import PostCard from 'components/PostCard';
import IntroBanner from 'components/IntroBanner';
import FeaturedPost from 'components/FeaturedPost';
import { getFeaturePostInfo } from 'api/api';

const Main = () => {
    return (
        <>
            <Header isLogoActive={true} isLogin={false} />
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
            <IntroBanner isLogin={false} />
            <FeaturedPost title="인기게시글" postInfo={getFeaturePostInfo()} />
            <FeaturedPost title="추천게시글" postInfo={getFeaturePostInfo()} />
        </>
    );
};

export default Main;
