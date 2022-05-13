import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface NavLinkProps {
  text: string;
}

const wrapper = {
  position: 'relative',

  '::after': {
    content: '""',

    width: '110%',
    position: 'absolute',
    left: '-5%',
    bottom: '0.2rem',
    borderBottom: '3.5px solid #1976d2',

    transform: 'scaleY(0)',
    transition: 'transform 100ms ease-in-out',
    transformOrigin: '0% 50%',
  },
  ':hover': {
    '::after': {
      transform: 'scaleY(1)',
    },
  },
};

function NavMenu({ text }: NavLinkProps) {
  const url = '/' + text.toLowerCase();

  return (
    <Box sx={wrapper}>
      <Link to={url}>
        <Typography variant="h6" component="div" gutterBottom>
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

export default NavMenu;
