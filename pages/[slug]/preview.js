import { fetcher } from '../../lib/apiFetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Page from './index';

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

  const fetchPreviewPage = async ( postId ) => {
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

  const fetchPreviewPageIdBySlug =  async ( pageSlug ) => {
    const pages = await fetcher( `/wp/v2/pages/?slug=${ pageSlug }` );
    if ( pages || pages.length > 0 ) {
      const page = pages[ 0 ];
      const postId = page.id;
      setId(postId);
    }
  }

  useEffect( () => {
    if ( id ) {
      fetchPreviewPage( id );
    }
  }, [ id ] );

  useEffect( () => {
    if ( ! id && slug && ! post ) {
      fetchPreviewPageIdBySlug( slug );
    }
  }, [ slug, id, post ] );

  return <Page post={ post } />;
}

export default Preview;


