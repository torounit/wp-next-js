import '../styles/globals.css'
import { useAuthorization } from '../lib/Authorization';

function MyApp({ Component, pageProps }) {
  useAuthorization();

  return <Component {...pageProps} />
}

export default MyApp
