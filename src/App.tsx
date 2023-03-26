import './App.css';
import CssBaseline from '@mui/joy/CssBaseline';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PrivateRoute } from './components/PrivateRoute';
import { ROUTES } from './constants/ROUTES';
import { Main, NotFound, SignIn } from './pages';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer position="bottom-center" theme="colored" autoClose={3000} />
      <Router>
        <Routes>
          <Route
            path={ROUTES.ROOT.path}
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MAIN.path}
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.SIGN_IN.path} element={<SignIn />} />
          <Route path={ROUTES.ALL.path} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
