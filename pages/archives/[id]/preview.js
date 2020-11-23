import { fetcher } from '../../../lib/apiFetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Post from './index';
import { fetchPreview } from '../../../lib/fetchers';

function Preview() {
  const [ post, setPost ] = useState();
  const [ id, setId ] = useState();
  const router = useRouter();
  useEffect( () => {
    if ( router.asPath !== router.route ) {
      setId( Number( router.query.id ) );
    }
  }, [ router ] );

  useEffect( () => {
    fetchPreview( { id, postTypeSlug: 'posts' } ).then( ( post ) => setPost( post ) );
  }, [ id ] );

  return <Post post={ post } />;
}

export default Preview;


