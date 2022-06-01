import axios from 'axios';

/**
 * @param {string} limit **default: 10**
 */
export const getLastBlocks =
  (limit: string = '10') =>
  async () => {
    const { data } = await axios.get(
      'https://public-api.solscan.io/block/last?limit=' + limit
    );
    return data;
  };

/**
 * @param {string} limit **default: 10**
 */
export const getLastTransactions =
  (limit: string = '10') =>
  async () => {
    const { data } = await axios.get(
      'https://public-api.solscan.io/transaction/last?limit=' + limit
    );
    return data;
  };

/**
 *
 * @param {string} block **required**
 * @param {string} offset **default: 0**
 * @param {string} limit **default: 10**
 * @returns
 */
export const getBlockTransactions =
  (block: string, offset: string = '0', limit: string = '10') =>
  async () => {
    const { data } = await axios.get(
      'https://public-api.solscan.io/block/transactions?block=' +
        block +
        '&offset=' +
        offset +
        '&limit=' +
        limit
    );
    return data;
  };

export const getTransactionBySignature = (signature: string) => async () => {
  const { data } = await axios.get(
    'https://public-api.solscan.io/transaction/' + signature
  );
  return data;
};
