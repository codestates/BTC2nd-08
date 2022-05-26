import { useQuery } from 'react-query';
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

import { getLastBlocks } from '../../api';
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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.1rem',
    overflow: 'hidden',
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

interface IScanData {
  currentSlot: number;
  result: {
    blockHeight: number;
    blockTime: number;
    blockhash: string;
    parentSlot: number;
    previousBlockhash: string;
    feeRewards: number;
    validator: string;
    transactionCount: number;
    message?: string;
  };
}

export default function CustomizedTables() {
  const { data, isError, isLoading } = useQuery(
    ['blocks', { limit: 15 }],
    getLastBlocks('15'),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 60 * 1000,
      refetchOnMount: 'always',
    }
  );

  console.log(data);

  return (
    <Box sx={wrapper}>
      <Typography sx={{ m: '3rem auto 3rem 1px' }} variant="h2">
        Blocks
      </Typography>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Block Hash</StyledTableCell>
                <StyledTableCell>Slot</StyledTableCell>
                <StyledTableCell sx={{ minWidth: '5rem' }}>
                  Tx Count
                </StyledTableCell>
                <StyledTableCell>Leader</StyledTableCell>
                <StyledTableCell sx={{ minWidth: '5rem' }} align="right">
                  Reward (Sol)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((block: IScanData) => {
                const blockHash =
                  block.result.blockhash ?? '❗' + block.result.message;
                const blockLeader = block.result.validator ?? 'Skipped slot';

                console.log(block.result.validator ?? 123);
                return (
                  <StyledTableRow key={block.currentSlot}>
                    <CustomTooltip text={blockHash}>
                      <StyledTableCell
                        sx={{
                          maxWidth: '20vw',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        component="th"
                        scope="block"
                      >
                        {blockHash}
                      </StyledTableCell>
                    </CustomTooltip>
                    <StyledTableCell>{block.currentSlot}</StyledTableCell>
                    <StyledTableCell>
                      {block.result.transactionCount ?? ''}
                    </StyledTableCell>
                    <CustomTooltip text={block.result.validator}>
                      <StyledTableCell
                        sx={{
                          maxWidth: '20vw',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {blockLeader}
                      </StyledTableCell>
                    </CustomTooltip>
                    <StyledTableCell align="right">
                      {block.result.feeRewards
                        ? (block.result.feeRewards * 0.000000001).toFixed(7)
                        : 0}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
