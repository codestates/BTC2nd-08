import { useQuery } from 'react-query';
import * as solanaWeb3 from '@solana/web3.js';
import { Box, Grid } from '@mui/material';
import Supply from './Supply';
import { getSolPrice } from '../../api/price';

console.log(solanaWeb3);

const wrapper = {
  width: '70vw',
  minWidth: '50rem',
  m: '0 auto',
  mb: '20vh',
};

function Index() {
  const { data: solData, isLoading: solDataIsLoading } = useQuery(
    ['navbar', 'price'],
    getSolPrice()
  );
  if (!solDataIsLoading) console.log(solData);

  return (
    <Box sx={wrapper}>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          {solDataIsLoading ? (
            <></>
          ) : (
            <Supply
              totalSupply={solData[0].total_supply}
              circulatingSupply={solData[0].circulating_supply}
            />
          )}
        </Grid>
        <Grid item lg={3}>
          {/* <Supply /> */}
        </Grid>
        <Grid item lg={3}>
          {/* <Supply /> */}
        </Grid>
        <Grid item lg={3}>
          {/* <Supply /> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
