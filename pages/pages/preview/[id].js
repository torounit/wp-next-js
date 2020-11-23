import { fetcher } from '../../../lib/apiFetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Article from '../../../components/Article';

function Preview() {
  const [ post, setPost ] = useState();
  const [ id, setId ] = useState();
  const router = useRouter();
  useEffect( () => {
    if ( router.asPath !== router.route ) {
      setId( Number( router.query.id ) );
    }
  }, [ router ] );

  const fetchPreviewPost = async ( postId ) => {
    if ( postId ) {
      const revisions = await fetcher( `/wp/v2/pages/${ postId }/revisions` );
      if ( revisions && revisions.length > 0 ) {
        setPost( revisions[0] );
      }
      else {
        const preview = await fetcher( `/wp/v2/pages/${ postId }` );
        setPost(preview);
      }
    }
  }

  useEffect( () => {
    fetchPreviewPost( id );
  }, [ id ] );

  return <Article post={ post } />;
}

export default Preview;


