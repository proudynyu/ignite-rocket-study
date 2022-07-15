import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const mocked_posts = [
  {
    slug: 'mocked_post_slug',
    title: 'mocked_post_title',
    excerpt: 'mocked_post_excerpt',
    updated_at: 'mocked_post_update',
  },
]

describe('Posts suite', () => {
  it('render correclty', () => {
    render(<Posts posts={mocked_posts} />)

    expect(screen.getByText(mocked_posts[0].title)).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
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
          },
        ],
      }),
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'my new post',
              excerpt: 'my paragraph',
              updated_at: '01 de abril de 2022',
            },
          ],
        },
      })
    )
  })
})
