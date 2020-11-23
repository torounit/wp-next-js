import { fetcher } from '../../lib/apiFetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Page from './index';
import { fetchPostBySlug, fetchPreview } from '../../lib/fetchers';

function Preview() {
  const [ post, setPost ] = useState();
  const [ id, setId ] = useState();
  const [ slug, setSlug ] = useState();
  const router = useRouter();
  useEffect( () => {
    if ( router.asPath !== router.route ) {
      setSlug( router.query.slug );
      setId( Number( router.query.id ) );
    }
  }, [ router ] );

  useEffect( () => {
    if ( !id && slug && !post ) {
      fetchPostBySlug( { slug, postTypeSlug: 'pages' } ).then( ( post ) => {
        if ( post && post.id ) {
          setId( post.id );
        }
      } );
    }
  }, [ slug, id, post ] );

  useEffect( () => {
    if ( id ) {
      fetchPreview( { id, postTypeSlug: 'pages' } ).then( ( post ) => setPost( post ) );
    }
  }, [ id ] );

  return <Page post={ post } />;
}

export default Preview;


