import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home, { getStaticProps } from '../../pages'
import {stripe} from '../../services/stripe' 

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})

jest.mock('../../services/stripe')

const mocked_product = {
  priceId: '1',
  amount: 1,
}

describe('Home suite', () => {
  it('render correclty', () => {
    render(<Home product={mocked_product} />)

    expect(screen.getByText('for 1 month')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retriveStripePriceMocked = mocked(stripe.prices.retrieve)
    
    retriveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})
