import { Grid, Skeleton, SxProps } from '@mui/material';

interface FormSkeletonProps {
  rows: number;
  columns: number[];
  sx?: SxProps;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ rows, columns, sx }) => {
  return (
    <Grid container spacing={2} sx={sx}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Grid container item xs={12} spacing={2} key={rowIndex}>
          {Array.from({ length: columns[rowIndex] || 1 }).map((_, colIndex) => (
            <Grid item xs={12 / (columns[rowIndex] || 1)} key={colIndex}>
              <Skeleton variant='text' height={25} width='50%' />
              <Skeleton variant='rectangular' height={30} width='100%' />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormSkeleton;
