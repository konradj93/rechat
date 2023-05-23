import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export const AppNavigation = () => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        padding: '16px',
        backgroundColor: 'primary.dark',
      }}>
      <Link component={RouterLink} to="/" underline="hover" color="white">
        <Typography color="white">Task manager</Typography>
      </Link>
    </Breadcrumbs>
  );
};
