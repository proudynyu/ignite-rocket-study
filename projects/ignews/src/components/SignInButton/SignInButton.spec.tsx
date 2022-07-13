import { render } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'

import { SignInButton } from '.'

jest.mock('next-auth/client')
const useSessionMocked = mocked(useSession)

describe(SignInButton.name, () => {
  test('Should render when user is not authenticate', () => {
    useSessionMocked.mockReturnValueOnce([null, false])

    const { container, getByText } = render(<SignInButton />)

    expect(container).not.toBeEmptyDOMElement()
    expect(getByText('Sign in with Github')).toBeInTheDocument()
  })

  test('Should render when user is authenticate', () => {
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'johndoe@qqrcoisa.com',
        },
        expires: 'fake-expires',
      },
      false,
    ])

    const { getByText } = render(<SignInButton />)

    expect(getByText('John Doe')).toBeInTheDocument()
  })
})
