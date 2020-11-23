import { fetcher } from '../lib/apiFetch';
import Article from '../components/Article';

function Page( { post } ) {
  return <Article post={ post } />;
}

export default Page;

export const getStaticPaths = async () => {
  const posts = await fetcher( '/wp/v2/pages?per_page=-1' );
  return {
    paths: posts.map( ( { id, slug } ) => ( {
      params: {
        id: id + '',
        slug: decodeURI( slug )
      }
    } ) ),
    fallback: process.env.NODE_ENV !== 'production' ? 'blocking' : false
  };
};

export const getStaticProps = async ( { params } ) => {
  if ( !params ) {
    return {
      props: {
        post: null,
      }
    };
  }
  const slug = typeof params.slug === 'string' ? params.slug : params.slug[ 0 ];
  const pages = await fetcher( `/wp/v2/pages/?slug=${ slug }` );
  return {
    props: {
      post: pages[ 0 ]
    }
  };
};

