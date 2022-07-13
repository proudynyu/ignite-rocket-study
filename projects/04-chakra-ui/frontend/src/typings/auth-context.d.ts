interface CredentialsProps {
  password: string
  email: string
}

interface AuthContextProps {
  signIn(credentials: CredentialsProps): Promise<void>
  signOut: (router?: NextRouter) => void
  isAuth: boolean
  authError: string
  user: UserAuth
}

interface UserAuth {
  email: string
  permissions: string[]
  roles: string[]
}

interface AxiosResponse {
  token: string
  refreshToken: string
  permissions: string[]
  roles: string[]
}