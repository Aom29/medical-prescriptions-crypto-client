import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import Login from '../pages/Login';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;