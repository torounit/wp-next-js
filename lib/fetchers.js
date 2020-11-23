import { fetcher } from './apiFetch';

export const fetchPreview = async ( { id, postTypeSlug } ) => {
  if ( id ) {
    const revisions = await fetcher( `/wp/v2/${postTypeSlug}/${ id }/revisions` );
    if ( revisions && revisions.length > 0 ) {
      return revisions[ 0 ];
    }
    return await fetcher( `/wp/v2/${postTypeSlug}/${ id }` );
  }
};

export const fetchPostBySlug = async ( { slug, postTypeSlug } ) => {
  const posts = await fetcher( `/wp/v2/${postTypeSlug}/?slug=${ slug }` );
  if ( posts || posts.length > 0 ) {
    return  posts[ 0 ];
  }
  return null;
};
