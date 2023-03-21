import './App.css';
import CssBaseline from '@mui/joy/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PrivateRoute } from './components/PrivateRoute';
import { ROUTES } from './constants/ROUTES';
import { Main, NotFound, SignIn } from './pages';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer position="bottom-left" theme="colored" autoClose={3000} />
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
