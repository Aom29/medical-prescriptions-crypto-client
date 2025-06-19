import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SimpleEdDSAPage from '../pages/SimpleEdDSA';
import SimpleX25519Page from '../pages/SimpleX25519';
import HomeMedic from '../pages/HomeMedic';
import HomeAdmin from '../pages/HomeAdmin';
import HomePatient from '../pages/HomePatient';
import HomePharmacist from '../pages/HomePharmacist';
import PrivateRoute from '../components/auth/PrivateRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/home-medic'
          element={
            <PrivateRoute requiredRole='MEDICO'>
              <HomeMedic />
            </PrivateRoute>
          }
        />

        <Route
          path='/home-admin'
          element={
              <HomeAdmin />
          }
        />

        <Route
          path='/home-patient'
          element={
            <PrivateRoute requiredRole='PACIENTE'>
              <HomePatient />
            </PrivateRoute>
          }
        />

        <Route
          path='/home-pharmacist'
          element={
            <PrivateRoute requiredRole='FARMACEUTICO'>
              <HomePharmacist />
            </PrivateRoute>
          }
        />

        <Route path='/simple-eddsa' element={<SimpleEdDSAPage />} />
        <Route path='/simple-x25519' element={<SimpleX25519Page />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
