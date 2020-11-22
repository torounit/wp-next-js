import { fetcher } from '../../lib/apiFetch';
import Article from '../../components/Article';

function Post( { post } ) {

  return <Article post={post}/>
}

export default Post;

export const getStaticPaths = async () => {
  const posts = await fetcher( '/wp/v2/posts?per_page=-1' );
  return {
    paths: posts.map( ( { id } ) => ( {
      params: {
        id: id + '',
      }
    } ) ),
    fallback: true
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
  const id = parseInt( params.id, 10 );
  const post = await fetcher( `/wp/v2/posts/${ id }` );
  return {
    props: {
      post: post
    }
  };
};

