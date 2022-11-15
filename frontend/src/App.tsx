import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import Main from './containers/Main';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
    );
};

export default App;
