import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatDate';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  previewRef: any;
}

export default function Post(props: PostProps) {
  const {
    data: { author, banner, content: contents, title },
    first_publication_date: publication,
    last_publication_date,
  } = props.post;

  const { isFallback } = useRouter();

  const humanReading = 200;
  const readingTime = contents
    .map(({ heading, body }) => {
      const headingLength = heading.split(/\s/g).length;
      const bodyLenght = body
        .map(b => b.text.split(/\s/g).length)
        .reduce((prev, curr) => prev + curr, 0);
      return Math.round((headingLength + bodyLenght) / humanReading);
    })
    .reduce((p, c) => p + c, 0);

  useEffect(() => {
    let script = document.createElement('script');
    let anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'proudynyu/05-challenge-ignite');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-dark');
    anchor.appendChild(script);
  }, [last_publication_date]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {isFallback ? (
        <p>Carregando...</p>
      ) : (
        <main className={styles.container}>
          <img className={styles.mainImg} src={banner.url} alt={title} />
          <article className={styles.post}>
            <h1>{title}</h1>
            <div className={styles.postInfo}>
              <time>
                <FiCalendar />
                {formatDate(publication)}
              </time>
              <span>
                <FiUser />
                {author}
              </span>
              <span>
                <FiClock />
                {String(readingTime + 1) + ' min'}
              </span>
            </div>
            {last_publication_date && (
              <span className={styles.lastEdit}>
                *editado em {formatDate(last_publication_date)}
              </span>
            )}
            {contents.map((content, index) => (
              <div key={index} className={styles.postContent}>
                <h2>{content.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </article>
          <footer>
            <div className={styles.otherPostsContainer}></div>
            <div
              id="inject-comments-for-uterances"
              className={styles.comments}
            ></div>
          </footer>
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.uid'],
      pageSize: 100,
    }
  );

  const paths = results.map(result => {
    return {
      params: {
        slug: result.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const previewRef = previewData ? previewData.ref : null;
  const refOption = previewRef ? { ref: previewRef } : null;

  const { slug } = params;
  const prismic = getPrismicClient();
  const { first_publication_date, data, last_publication_date } =
    await prismic.getByUID('post', String(slug), refOption);

  const post = {
    first_publication_date: first_publication_date,
    last_publication_date,
    data: {
      title: data.title,
      subtitle: data.subtitle,
      banner: {
        url: data.banner.url,
      },
      author: data.author,
      content: data.content,
    },
    uid: data.title.toLowerCase().replaceAll(' ', '-'),
  };

  return {
    props: { post, previewRef },
  };
};
