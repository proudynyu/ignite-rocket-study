import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from "next"
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../context/AuthContext'

const BASE_PROP_COOKIE = {
  maxAge: 60 * 60 * 25 * 30,
  path: '/',
}

let isRefreshing = false
let failedRequestQueue = []

export function setupApiClient(ctx: (GetServerSidePropsContext | undefined) = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })

  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'nextauth.refreshToken': refreshToken } = cookies

          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true
            api
              .post('/refresh', {
                refreshToken
              })
              .then(response => {
                const { token } = response.data

                setCookie(
                  ctx,
                  'nextauth.token',
                  token,
                  BASE_PROP_COOKIE
                )

                setCookie(
                  ctx,
                  'nextauth.refreshToken',
                  response.data.refreshToken,
                  BASE_PROP_COOKIE
                )

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestQueue.forEach(request => request.onSuccess(token))
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach(request => request.onFailure(err))
                failedRequestQueue = []
              })
              .finally(() => { isRefreshing = false })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })

        } else {
          signOut()
        }
      }

      return Promise.reject(error)
    })

  return api
}