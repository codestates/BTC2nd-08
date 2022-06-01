import axios from 'axios';

/**
 * @param {}
 * @returns {Promise<any>}
 */
export const getSolPrice = () => async () => {
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d'
  );
  return data;
};
