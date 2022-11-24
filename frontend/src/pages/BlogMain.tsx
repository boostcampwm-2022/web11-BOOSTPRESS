import styled from '@emotion/styled/macro';
import FeaturedPost from 'components/FeaturedPost';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Sidebar from 'components/Sidebar';
import { getFeaturePostInfo } from 'api/api';

const BlogMain = () => {
    const dummyPosts = getFeaturePostInfo();
    return (
        <Wrapper>
            <Header isLogoActive={false} isLogin={false} />
            <Sidebar />
            <Main>
                <FeaturedPost title="" postInfo={dummyPosts} />
                <Pagination curPage={3} maxPage={5} setCurPage={() => {}} />
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
