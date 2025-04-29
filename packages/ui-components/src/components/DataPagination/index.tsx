import { Box, Pagination, PaginationProps, Typography } from '@mui/material'

interface DataPaginationProps extends Omit<PaginationProps, 'onChange'> {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  showCount?: boolean
}

const DataPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  showCount = true,
  ...props
}: DataPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      {showCount && (
        <Typography variant="body2" color="text.secondary">
          Showing {startItem}-{endItem} of {totalItems} items
        </Typography>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        {...props}
      />
    </Box>
  )
}

export default DataPagination 