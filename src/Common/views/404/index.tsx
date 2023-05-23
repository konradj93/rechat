import { Typography, Button } from '@mui/material';
import { BaseLayout } from '../BaseLayout/BaseLaout';
import { Link as RouterLink } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <BaseLayout>
      <Typography>
        Unfortunatelly we cannot find page you are looking for plase use below
        button to back to homepage
      </Typography>
      <Button component={RouterLink} to={'/'}>
        Back to homepage
      </Button>
    </BaseLayout>
  );
};
