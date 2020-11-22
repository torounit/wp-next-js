import { fetcher } from '../../../lib/apiFetch';
import { useRouter } from 'next/router';
import useSWR from 'swr';
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

  useEffect( () => {
    if ( id ) {
      fetcher( `/wp/v2/posts/${ id }` ).then( result => {
        setPost(result);
      } );
    }
  }, [ id ] );

  return <Article post={ post } />;
}

export default Preview;


