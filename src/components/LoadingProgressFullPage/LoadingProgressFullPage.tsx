import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';

export const LoadingProgressFullPage = () => {
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
        <Typography level="h6" component="h1" textAlign="center" sx={{ mb: 3 }}>
          Data is loading...
        </Typography>
        <CircularProgress />
      </Box>
    </Box>
  );
};
