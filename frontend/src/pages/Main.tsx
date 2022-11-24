/* Main 페이지 */
import React from 'react';
import Header from 'components/Header';
import IntroBanner from 'components/IntroBanner';
import FeaturedPost from 'components/FeaturedPost';
import { getFeaturePostInfo } from 'api/api';

const Main = () => {
    return (
        <>
            <Header isLogoActive={true} isLogin={false} />
            <IntroBanner isLogin={false} />
            <FeaturedPost title="" postInfo={getFeaturePostInfo()} />
            <FeaturedPost title="" postInfo={getFeaturePostInfo()} />
        </>
    );
};

export default Main;
