import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import BlogMain from 'pages/BlogMain';
import NewPost from 'pages/NewPost';
import Post from 'pages/Post';

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Main />} />

            <Route path="/newpost" element={<NewPost />} />
            <Route path="/blog/:userId" element={<BlogMain />} />
            <Route path="/post/:userId/:postId" element={<Post />} />
        </Routes>
    );
};

export default App;
