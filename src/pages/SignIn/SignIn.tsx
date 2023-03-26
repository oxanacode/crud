import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../components/AuthForm';
import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';

import { ROUTES } from '../../constants/ROUTES';

export const SignIn = () => {
  const auth = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate(ROUTES.MAIN.path);
    }
  }, [auth, navigate]);

  return (
    <Box component="main" sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          py: 6,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: 300,
            p: 2,
            borderRadius: 'sm',
          }}
        >
          <div>
            <Typography level="h4" component="h1" textAlign="center">
              <b>Welcome!</b>
            </Typography>

            <Typography level="body2" textAlign="center">
              Sign in to continue
            </Typography>

            <AuthForm />
          </div>
        </Sheet>
      </Box>
    </Box>
  );
};
