import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import BlogMain from 'pages/BlogMain';
import NewPost from 'pages/NewPost';
import Post from 'pages/Post';
import Admin from 'pages/Admin';
import PersonalInfoManage from 'pages/Admin/PersonalInfoManage';
import ContentsManage from 'pages/Admin/Contents';

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Main />} />

            <Route path="/newpost" element={<NewPost />} />
            <Route path="/blog/:userId" element={<BlogMain />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/admin" element={<Admin />}>
                <Route path="personalInfo" element={<PersonalInfoManage />} />
                <Route path="contents" element={<ContentsManage />} />
            </Route>
        </Routes>
    );
};

export default App;
