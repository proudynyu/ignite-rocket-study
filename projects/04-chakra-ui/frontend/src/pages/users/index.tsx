import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { UserTable } from '../../components/Users/UserTable'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList() {
  const [page, setPage] = useState<number>(1)
  const { data, error, isLoading, isFetching } = useUsers(page)

  return (
    <Box w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
      <Header />
      <Flex>
        <Sidebar />
        <Box flex='1' borderRadius={0} bg='gray.800' p={8}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {isFetching && !isLoading && (
                <Spinner size='sm' color='gray.500' ml={4} />
              )}
            </Heading>
            <Link href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                cursor='pointer'
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error || !data ? (
            <Flex justify='center'>
              <Text>Erro ao carregar os usuários</Text>
            </Flex>
          ) : (
            <>
              <UserTable users={data.users} />
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
