import Head from 'next/head';
import useSWR from 'swr';
import { fetcher } from '../lib/apiFetch';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home( { posts: initialData } ) {
  const { data: posts, error } = useSWR( '/wp/v2/posts?per_page=-1&context=edit', fetcher, { initialData } );
  if ( error ) return <div>failed to load</div>;

  const user = useSWR( '/wp/v2/users/me', fetcher );
  useEffect( () => {
    fetcher( '/wp/v2/users/me' ).then( (result) => console.log(result))
  })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <ul>
        { posts.map( ( { id, title } ) => (
          <li key={ id }>
            <Link href={ `/archives/${ id }` }>
              { title?.rendered }
            </Link>
          </li>
        ) ) }
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await fetcher( '/wp/v2/posts?per_page=-1' );
  return {
    props: {
      posts: posts || []
    }
  };
};
