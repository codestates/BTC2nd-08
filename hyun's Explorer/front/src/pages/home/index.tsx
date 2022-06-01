import * as solanaWeb3 from '@solana/web3.js';
import { Box } from '@mui/material';

console.log(solanaWeb3);

const wrapper = {
  width: '70vw',
  minWidth: '50rem',
  m: '0 auto',
  mb: '20vh',
};

export default function index() {
  return <Box sx={wrapper}>home</Box>;
}
