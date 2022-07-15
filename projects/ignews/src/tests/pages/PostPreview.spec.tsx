import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { getPrismicClient } from '../../services/prismic'
import Post, {
  getStaticPaths,
  getStaticProps,
} from '../../pages/posts/preview/[slug]'

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

const useSessionMocked = mocked(useSession)
const useRouterMocked = mocked(useRouter)

const mocked_post = {
  slug: 'mocked_post_slug',
  title: 'mocked_post_title',
  content: 'mocked_post_excerpt',
  updated_at: 'mocked_post_update',
}

describe('Post suite', () => {
  it('render correclty', () => {
    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: null,
      },
      false,
    ])

    render(<Post post={mocked_post} />)

    expect(screen.getByText(mocked_post.title)).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects the user if it has an active subscription', () => {
    const routerMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: 'active-mocked',
      },
      false,
    ])

    useRouterMocked.mockReturnValueOnce({
      push: routerMocked,
    } as any)

    render(<Post post={mocked_post} />)

    expect(routerMocked).toHaveBeenCalledWith('/post/mocked_post_slug')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

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

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post',
      },
    })

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
