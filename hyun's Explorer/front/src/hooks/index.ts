import { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import { getTransactionBySignature } from '../api';

export const useGetTxData = (signatures: string[]) => {
  const [txDatas, setTxDatas] = useState<any[]>([]);

  const txs = useQueries(
    signatures.map((signature) => {
      return {
        queryKey: ['tx', signature],
        queryFn: getTransactionBySignature(signature),
      };
    })
  );

  return txDatas;
};
