import { useRouter } from 'next/router';
import Head from 'next/head';
import ConnectWPButton from '../components/ConnectWPButton';

export default function Auth() {
  return (
    <div>
      <Head>
        <title>Create Auth App</title>
      </Head>
      <ConnectWPButton>Connect to WP</ConnectWPButton>
    </div>
  );
}
