import { render } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    },
  }
})

jest.mock('next-auth/client', () => {
  return {
    signIn: jest.fn(),
    signOut: jest.fn(),
    useSession() {
      return [null, false]
    },
  }
})

describe(Header.name, () => {
  test('Should render correctly', () => {
    const { container } = render(<Header />)

    expect(container).not.toBeEmptyDOMElement()
  })
})
