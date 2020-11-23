import 'cross-fetch/polyfill'
import apiFetch from '@hamworks/wordpress-api-fetch';

apiFetch.use( apiFetch.createRootURLMiddleware( `${process.env.WORDPRESS_URL}/wp-json/` ) );

export const fetcher = ( path ) => {
  const authorization = globalThis?.localStorage?.getItem( 'authorization' );
  const headers = {};
  let request = path;
  if ( authorization ) {
    headers[ 'Authorization'] = `Basic ${ authorization }`;
  }

  return apiFetch( {
    path: request,
    credentials: 'omit',
    headers: headers,
  } );
};

export default apiFetch;
