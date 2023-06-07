import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/user/profile" element={<UserProfilePage />}
        />
      </Routes>
    </>
  );
}

export default App;
