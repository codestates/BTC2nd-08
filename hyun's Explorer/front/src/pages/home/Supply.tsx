import { Paper, Typography } from '@mui/material';

interface SupplyProps {
  totalSupply: number;
  circulatingSupply: number;
}

function Supply({ totalSupply, circulatingSupply }: SupplyProps) {
  return (
    <Paper sx={{ p: '2rem' }}>
      <Typography variant="subtitle1">SOL Supply</Typography>
      <Typography variant="h5">
        {totalSupply.toLocaleString('en-US')}
      </Typography>
      <br />
      <Paper elevation={0} sx={{ backgroundColor: 'grey.100', p: '1rem' }}>
        <Typography variant="subtitle2">Circulating Supply</Typography>
        <Typography>{circulatingSupply.toLocaleString('en-US')}</Typography>
        <br />
        <Typography variant="subtitle2">Non - circulating Supply</Typography>
        <Typography>
          {(totalSupply - circulatingSupply).toLocaleString('en-US')}
        </Typography>
      </Paper>
    </Paper>
  );
}

export default Supply;
