import type { FC } from 'react'
import { Box, Button, Checkbox, Icon, Td, Tr, Text } from '@chakra-ui/react'

import { RiPencilLine } from 'react-icons/ri'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface Props {
  user: User
  isWideVersion: boolean
}

export const EditUser: FC<Props> = ({ user, isWideVersion }) => {
  return (
    <Tr key={user.id}>
      <Td px={[4, 6]}>
        <Checkbox colorScheme='pink' />
      </Td>
      <Td>
        <Box>
          <Text fontWeight='bold'>{user.name}</Text>
          <Text fontWeight='normal' fontSize='sm' color='gray.300'>
            {user.email}
          </Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{user.createdAt}</Td>}
      <Td>
        <Button
          as='a'
          size='sm'
          fontSize='sm'
          colorScheme='purple'
          leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
          cursor='pointer'
        >
          {isWideVersion ? 'Editar' : ''}
        </Button>
      </Td>
    </Tr>
  )
}
