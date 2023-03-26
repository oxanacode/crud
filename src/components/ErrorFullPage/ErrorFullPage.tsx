import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import { INFO_MESSAGE } from '../../constants/INFO_MESSAGE';

export const ErrorFullPage = () => {
  return (
    <Box component="main" sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Typography level="h6" component="h1" textAlign="center" sx={{ mt: 10, mb: 3 }}>
          {INFO_MESSAGE.NO_DATA}
        </Typography>
      </Box>
    </Box>
  );
};
