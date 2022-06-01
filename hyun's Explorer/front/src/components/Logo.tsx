import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function Logo() {
  return (
    <Link to="/">
      <Typography sx={{ mr: '2rem' }} variant="h5">
        HYUN'S EXPLORER
      </Typography>
    </Link>
  );
}

export default Logo;
