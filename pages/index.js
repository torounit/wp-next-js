import Head from 'next/head';
import { fetcher } from '../lib/apiFetch';
import Link from 'next/link';

export default function Home( { posts } ) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <ul>
        <li><Link href="/hoge">hoge</Link></li>
        <li><Link href="/hoge/hoge.html">hoge/hoge</Link></li>
        <li><Link href="/about.html">about</Link></li>
      </ul>

      <ul>
        { posts.map( ( { id, title } ) => (
          <li key={ id }>
            <Link href={ `/archives/${ id }.html` }>
              { title?.rendered }
            </Link>
          </li>
        ) ) }
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await fetcher( '/wp/v2/posts?per_page=-1' )
  return {
    props: {
      posts: posts || []
    }
  };
};
