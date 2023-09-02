import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginWithGoogle from '../src/pages/login/login'; 
import HomePage from '../src/pages/home/home';
import SignIn from '../src/pages/cadastro/cadastro';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginWithGoogle />} />
        <Route path="/cadastro" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
