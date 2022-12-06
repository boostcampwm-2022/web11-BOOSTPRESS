/* Main 페이지 */
import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import IntroBanner from 'components/IntroBanner';
import { getFeaturePostInfo, getUserInfo } from 'api/api';
import { useQuery } from '@tanstack/react-query';
import PostGrid from 'components/PostGrid';

const Main = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { isLoading, isError, data } = useQuery({
        queryKey: ['recentPosts'],
        queryFn: getFeaturePostInfo,
    });

    const checkLogin = async () => {
        const res = await getUserInfo();
        if (res.nickname) setIsLogin(true);
        else setIsLogin(false);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <>
            <Header isLogoActive={true} />
            <IntroBanner isLogin={isLogin} />
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
