import {
  Checkbox,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { EditUser } from './EditUser'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface Props {
  users: User[]
}

export const UserTable: FC<Props> = ({ users = [] }) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Table colorScheme='whiteAlpha'>
      <Thead>
        <Tr>
          <Th px={[4, 6]} color='gray.300' w='8'>
            <Checkbox colorScheme='pink' />
          </Th>
          <Th>Usuário</Th>
          {isWideVersion && <Th>Data de Cadastro</Th>}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <EditUser user={user} isWideVersion={isWideVersion} key={user.id} />
        ))}
      </Tbody>
    </Table>
  )
}
