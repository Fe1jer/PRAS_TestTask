import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { history } from './_helpers';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Admin from './components/Admin';
import Home from './components/Home';
import NewsDetailsPage from './components/news/NewsDetailsPage';
import NewsPage from './components/news/NewsPage';
import NewsAdminPage from './components/news/NewsAdminPage';
import Login from './components/Login';

export default function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Header />
            <div className="container pt-4 pb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                    <Route path="/Admin/News" element={<PrivateRoute><NewsAdminPage /></PrivateRoute>} />
                    <Route path="/News" element={<NewsPage />} />
                    <Route path="/News/:id" element={<NewsDetailsPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h2>Ресурс не найден</h2>} />
                </Routes>
            </div>
        </div>
    );
}
