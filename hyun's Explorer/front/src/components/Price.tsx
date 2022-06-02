import { Paper, Typography, Avatar } from '@mui/material';
import { useQuery } from 'react-query';
import { getSolPrice } from '../api/price';

function Price() {
  const { data, isLoading } = useQuery(['navbar', 'price'], getSolPrice());

  if (!isLoading)
    console.log(
      data[0].price_change_percentage_24h < 0
        ? 'palette.error.light'
        : 'pallette.main.main'
    );
  return (
    <>
      {!isLoading && (
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey.100',
            width: '10rem',
          }}
        >
          <Avatar
            sx={{ height: '1.5rem', width: '1.5rem', mr: '0.5rem' }}
            src={data[0].image}
          />
          <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
            {data[0].current_price}$
          </Typography>
          &nbsp;
          <Typography
            sx={{
              color:
                data[0].price_change_percentage_24h < 0
                  ? 'error.light'
                  : 'main.main',
              textAlign: 'center',
            }}
            variant="subtitle2"
          >
            {data[0].price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </Paper>
      )}
    </>
  );
}

export default Price;
