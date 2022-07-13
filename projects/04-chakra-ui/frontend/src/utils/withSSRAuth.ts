import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPageContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import decode from "jwt-decode"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import { validateUserPermissions } from "./validadeUserPermissions"

interface WithSSRAuthOptions {
  permissions?: string[]
  roles?: string[]
}

export function withSSRAuth<T>(fn: GetServerSideProps<T>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token)
      const userHasValidateOptions = validateUserPermissions({ user, ...options })

      if (!userHasValidateOptions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}