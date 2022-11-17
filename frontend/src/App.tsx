import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import NewPost from 'pages/NewPost';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/newpost" element={<NewPost />} />
        </Routes>
    );
};

export default App;
