import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({handleChange, page, totalPage=10}) {
 

  return (
    <Stack spacing={2}>
      <Typography>Página: {page}</Typography>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </Stack>
  );
}