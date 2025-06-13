import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import Login from '../pages/Login';
import SimpleEdDSAPage from '../pages/SimpleEdDSA'
import SimpleX25519Page from '../pages/SimpleX25519'
import HomeMedic from '../pages/medic/HomeMedic';
import HomeAdmin from '../pages/admin/HomeAdmin';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home-medic' element={<HomeMedic />} />
        <Route path='/home-admin' element={<HomeAdmin />} />
        <Route path='/simple-eddsa' element={<SimpleEdDSAPage />} />
        <Route path='/simple-x25519' element={<SimpleX25519Page />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;