import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Link as RouterLink } from 'react-router-dom';

import image from '../../assets/images/page_404.png';
import { ROUTES } from '../../constants/ROUTES';

export const NotFound = () => {
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
          gap: 6,
          px: 2,
          py: 6,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box component="img" src={image} alt="Not found page" sx={{ width: '100%', maxHeight: 300 }} />
        </Box>
        <Typography component="h2" level="h4">
          Page Not Found!
        </Typography>
        <Link component={RouterLink} to={ROUTES.MAIN.path} underline={'none'}>
          <Button variant="outlined" color="neutral" size="lg" startDecorator={<ArrowBackRoundedIcon />}>
            Go back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
