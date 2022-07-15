import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'

import Post, { getServerSideProps } from '../../pages/posts/[slug]'

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

const mocked_post = {
  slug: 'mocked_post_slug',
  title: 'mocked_post_title',
  content: 'mocked_post_excerpt',
  updated_at: 'mocked_post_update',
}

describe('Post suite', () => {
  it('render correclty', () => {
    render(<Post post={mocked_post} />)

    expect(screen.getByText(mocked_post.title)).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: 'my-post',
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false,
        },
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'active',
    })

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'my new post',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'my paragraph',
            },
          ],
        },
        last_publication_date: '04-01-2022',
      }),
    } as any)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'my new post',
            content: '<p>my paragraph</p>',
            updated_at: '01 de abril de 2022',
          },
        },
      })
    )
  })
})
