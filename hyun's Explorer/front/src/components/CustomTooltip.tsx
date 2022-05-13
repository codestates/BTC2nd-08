import { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[100],
    boxShadow: theme.shadows[4],
    fontSize: '1rem',
  },
}));

export default function CustomizedTooltips({
  children,
  text,
}: {
  children: ReactElement<any, any>;
  text?: string;
}) {
  return text ? <LightTooltip title={text}>{children}</LightTooltip> : null;
}
