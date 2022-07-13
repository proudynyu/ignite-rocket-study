import { render } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    },
  }
})

describe(ActiveLink.name, () => {
  test('Should render properly', () => {
    const { container } = render(
      <ActiveLink href="#" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(container).not.toBeEmptyDOMElement()
  })

  test('Should pass the active class', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toHaveClass('active')
  })
})
