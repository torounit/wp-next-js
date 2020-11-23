import { addQueryArgs } from '@wordpress/url';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ConnectWPButton( { children, successURL = '' } ) {

  const [ href, setHref ] = useState( '' );
  useEffect( () => {
    const callbackURL = globalThis?.location?.href;
    setHref( addQueryArgs(
      `${ process.env.WORDPRESS_URL }/wp-admin/authorize-application.php`,
      {
        app_id: process.env.APP_ID,
        app_name: process.env.APP_NAME,
        success_url: successURL || callbackURL,
      }
    ) );
  } );

  return (
    <a href={ href }>
      { children }
    </a>
  );
}

export default ConnectWPButton;
