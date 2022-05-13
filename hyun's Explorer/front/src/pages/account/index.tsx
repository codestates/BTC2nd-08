import { useParams } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

const wrapper = {
  width: '70vw',
  minWidth: '50rem',
  m: '0 auto',
  mb: '20vh',
};

function Index() {
  const params = useParams();
  console.log(params);

  return (
    <Box sx={wrapper}>
      <Typography sx={{ m: '3rem auto 3rem 1px' }} variant="h2">
        Account
      </Typography>
      <Typography variant="h5">{params.accountAddress}</Typography>
      <Typography variant="h5">{params.accountAddress}</Typography>
    </Box>
  );
}

export default Index;
