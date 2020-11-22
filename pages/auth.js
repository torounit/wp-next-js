import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Auth() {
  const {
    query: { user_login, password },
  } = useRouter();


  useEffect( () => {
    localStorage.setItem( 'user_login', user_login );
    localStorage.setItem( 'password', password );
    localStorage.setItem( 'authorization', btoa(user_login + ":" + password ) )
  }, [ user_login, password ] )

  const app_id = '15891e06-cfd5-4efb-a0bf-1b90bcbb366';
  const app_name = 'next';

  return (
    <div>
      <Head>
        <title>Create Auth App</title>
      </Head>
      <a  href={ `${process.env.WORDPRESS_URL}/wp-admin/authorize-application.php?${app_id}c&app_name=${app_name}&success_url=http://localhost:3000/auth` }>
        auth
      </a>
    </div>
  );
}
