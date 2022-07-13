import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { NextRouter } from 'next/router'

import { api } from '../services/apiClient'
import { isEmptyObject } from '../utils'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

let authChannel: BroadcastChannel

export const signOut = (router?: NextRouter): void => {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  authChannel.postMessage('signOut')

  if (router) router.push('/')
  else window.location.href = '/'
}

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter()

  const [user, setUser] = useState<UserAuth>({} as UserAuth)
  const [authError, setAuthError] = useState<string>('')
  const isAuth = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (msg) => {
      switch (msg.data) {
        case 'signOut':
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get<UserAuth>('me')
        .then((resp) => {
          const { email, permissions, roles } = resp?.data

          setUser({
            email,
            permissions,
            roles,
          })
        })
        .catch(() => signOut(router))
    }
  }, [])

  async function signIn({ email, password }: CredentialsProps) {
    try {
      const {
        data: { token, refreshToken, permissions, roles },
      } = await api.post<AxiosResponse>('sessions', {
        email,
        password,
      })

      const BASE_PROP_COOKIE = {
        maxAge: 60 * 60 * 25 * 30,
        path: '/',
      }

      setCookie(undefined, 'nextauth.token', token, BASE_PROP_COOKIE)
      setCookie(
        undefined,
        'nextauth.refreshToken',
        refreshToken,
        BASE_PROP_COOKIE
      )

      setUser({
        email,
        permissions,
        roles,
      })

      router.push('/dashboard')
    } catch (err) {
      setAuthError('Dados invalidos')

      setTimeout(() => setAuthError(''), 1500)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuth, authError, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (isEmptyObject(context)) {
    throw new Error('useAuthContxt must be used inside the AuthContext')
  }

  return context
}
