import { fireEvent, render } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession, signIn } from 'next-auth/client'
import { SubscribeButton } from '.'
import { useRouter } from 'next/router'

jest.mock('next-auth/client')
const useSessionMocked = mocked(useSession)
const signInMocked = mocked(signIn)

jest.mock('next/router')
const useRouterMocked = mocked(useRouter)

describe('SubscribeButton suite', () => {
  it('Should render properly', () => {
    useSessionMocked.mockReturnValueOnce([null, false])
    const { getByText } = render(<SubscribeButton />)

    expect(getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects to sign in when not authenticate', () => {
    useSessionMocked.mockReturnValueOnce([null, false])
    
    const { getByText } = render(<SubscribeButton />)

    const button = getByText('Subscribe now')

    fireEvent.click(button)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts if user already has a subscription', () => {
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'johndoe@qqrcoisa.com',
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires',
      },
      false,
    ])
    
    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    const { getByText } = render(<SubscribeButton />)

    const button = getByText('Subscribe now')

    fireEvent.click(button)

    expect(pushMocked).toHaveBeenCalled()
  })
})
