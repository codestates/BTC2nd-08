import { useState } from 'react';
import { useQuery, useQueries } from 'react-query';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { getLastTransactions, getTransactionBySignature } from '../../api';
import Loading from '../../components/Loading';
import CustomTooltip from '../../components/CustomTooltip';

const wrapper = {
  width: '70vw',
  minWidth: '50rem',
  m: '0 auto',
  mb: '20vh',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
    fontSize: '1.1rem',
    textOverflow: 'ellipsis',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.1rem',
    maxWidth: '20vw',
    textOverflow: 'ellipsis',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[50],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ITxsData {
  meta: {
    err?: object;
  };
  transaction: {
    signatures: string[];
  };
}

export default function CustomizedTables() {
  const [signatures, setSignatures] = useState<string[]>([]);

  const { data, isError, isLoading } = useQuery(
    ['transactions', { limit: 15 }],
    getLastTransactions('15'),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 60 * 1000,
      onSuccess(data) {
        const sig = data.map((tx: ITxsData) => tx.transaction.signatures[0]);
        setSignatures(sig);
      },
      refetchOnMount: 'always',
    }
  );

  const txs = useQueries(
    signatures.map((signature: string) => {
      return {
        queryKey: ['tx', signature],
        queryFn: getTransactionBySignature(signature),
        options: {
          cacheTime: 5 * 60 * 1000,
          staleTime: 60 * 1000,
        },
      };
    })
  );

  return (
    <Box sx={wrapper}>
      <Typography sx={{ m: '3rem auto 3rem 1px' }} variant="h2">
        Transactions
      </Typography>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Signature</StyledTableCell>
                <StyledTableCell>Block</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>By</StyledTableCell>
                <StyledTableCell align="right">Fee (Sol)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txs.map(
                (tx) =>
                  !tx.isLoading && (
                    <StyledTableRow key={tx.data.txHash}>
                      <CustomTooltip text={tx.data.txHash}>
                        <StyledTableCell
                          component="th"
                          sx={{
                            maxWidth: '20vw',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tx.data.txHash}
                        </StyledTableCell>
                      </CustomTooltip>
                      <StyledTableCell>{tx.data.slot}</StyledTableCell>
                      <StyledTableCell>{tx.data.blockTime}</StyledTableCell>
                      <CustomTooltip text={tx.data.signer[0]}>
                        <StyledTableCell
                          sx={{
                            maxWidth: '20vw',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tx.data.signer[0]}
                        </StyledTableCell>
                      </CustomTooltip>
                      <StyledTableCell align="right">
                        {tx.data.fee && (tx.data.fee * 0.000000001).toFixed(7)}
                      </StyledTableCell>
                    </StyledTableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
