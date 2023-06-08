import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
		/>
        <Route
          path="/community"
          element={<CommunityPage />}
        />
      </Routes>
    </>
  );
}

export default App;
