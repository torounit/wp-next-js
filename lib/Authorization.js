import { fetcher } from './apiFetch';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const KEY = 'authorization';

export async function signIn( user_login, password ) {
  if ( user_login && password ) {
    localStorage.setItem( KEY, btoa( user_login + ':' + password ) );
    try {
      return await fetcher( '/wp/v2/users/me');
    }
    catch ( e ) {
      return false;
    }
  }
}

export function signOut() {
  localStorage.removeItem( KEY );
}

export function isSignedIn() {
  return !! localStorage.getItem( KEY )
}

export function useAuthorization() {
  const {
    query: { user_login, password },
  } = useRouter();

  useEffect( () => {
    signIn( user_login, password )
  }, [ user_login, password ] )

}
