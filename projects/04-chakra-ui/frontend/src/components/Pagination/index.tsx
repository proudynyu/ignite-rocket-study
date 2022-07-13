import { Box, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { PaginationItem } from './PaginationItem'

interface Props {
  totalCountOfRegisters: number
  registerPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export const Pagination: FC<Props> = ({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registerPerPage = 10,
}) => {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPage =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Stack
      direction={['column', 'row']}
      mt='8'
      justify='space-between'
      align='center'
      spacing='6'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange} />

            {currentPage > 2 + siblingsCount && (
              <Text color='gray.300' width={6} textAlign='center'>
                ...
              </Text>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          isCurrent
          pageNumber={currentPage}
          onPageChange={onPageChange}
        />

        {nextPage.length > 0 &&
          nextPage.map((page) => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color='gray.300' width={6} textAlign='center'>
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
