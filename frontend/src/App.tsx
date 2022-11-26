import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import BlogMain from 'pages/BlogMain';
import NewPost from 'pages/NewPost';
import Test from 'editor/test';

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Main />} />
            <Route path="/blog" element={<BlogMain />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
};

export default App;
