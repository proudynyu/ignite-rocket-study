import { Button } from '@chakra-ui/react'

interface Props {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (page: number) => void
}

export const PaginationItem = ({
  isCurrent = false,
  pageNumber,
  onPageChange,
}: Props) => {
  if (isCurrent) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        w='4'
        colorScheme='pink'
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    )
  }
  return (
    <Button
      size='sm'
      fontSize='xs'
      w='4'
      colorScheme='gray.700'
      _hover={{ bg: 'gray.500' }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
