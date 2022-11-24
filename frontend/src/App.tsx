import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import BlogMain from 'pages/BlogMain';

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Main />} />
            <Route path="/blog/:userId" element={<BlogMain />} />
        </Routes>
    );
};

export default App;
