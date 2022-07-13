import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import { useState } from 'react';
import Head from 'next/head';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { formatDate } from '../utils/formatDate';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps) {
  const [postPagination, setPostPagination] = useState<PostPagination>(
    props.postsPagination
  );

  function handleLoadMore() {
    fetch(postPagination.next_page)
      .then((resp: Response) => resp.json())
      .then((parsed: PostPagination) => {
        const post = parsed.results[0];
        setPostPagination({
          next_page: parsed.next_page,
          results: [
            ...postPagination.results,
            {
              uid: post?.uid,
              first_publication_date: post?.first_publication_date,
              data: {
                title: String(post?.data.title),
                subtitle: String(post?.data.subtitle),
                author: String(post?.data.author),
              },
            },
          ],
        });
      });
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.container}>
        {postPagination.results.map(post => (
          <Link href={`/post/${post.uid}`} key={post.uid}>
            <a title="test">
              <h2>{post.data.title}</h2>
              <p>{post.data.subtitle}</p>
              <div>
                <time>
                  <FiCalendar />
                  {formatDate(post.first_publication_date)}
                </time>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
              </div>
            </a>
          </Link>
        ))}

        {postPagination.next_page && (
          <div className={styles.buttonContainer}>
            <button onClick={handleLoadMore}>Carregar mais posts</button>
          </div>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    },
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post?.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: String(post.data.title),
        subtitle: String(post.data.subtitle),
        author: String(post.data.author),
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: { postsPagination },
  };
};
