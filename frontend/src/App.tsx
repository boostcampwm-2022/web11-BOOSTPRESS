import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import BlogMain from 'pages/BlogMain';
import NewPost from 'pages/NewPost';
import Test from 'editor/test';
import MdxTest from 'editor/MdxTest';

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Main />} />
            <Route path="/blog/:userId" element={<BlogMain />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/test" element={<Test />} />
            {/* <Route path="/test2" element={<MdxTest />} /> */}
        </Routes>
    );
};

export default App;
