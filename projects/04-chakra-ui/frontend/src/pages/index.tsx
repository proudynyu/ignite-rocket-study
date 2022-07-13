import { Flex, Button, Stack, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useAuthContext } from '../context/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuests'

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {
  const { isAuth, signIn, authError } = useAuthContext()

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<SubmitProps> = async (values, event) => {
    event.preventDefault()
    await signIn(values)
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as='form'
        w='100%'
        maxW='360'
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
      >
        <Stack spacing={4}>
          <Input
            name='email'
            label='E-mail'
            error={errors.email}
            type='email'
            {...register('email')}
          />
          <Input
            name='password'
            label='Password'
            type='password'
            error={errors.password}
            {...register('password')}
          />

          {!!authError && <Text color='red'>{authError}</Text>}
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    }
  }
)
