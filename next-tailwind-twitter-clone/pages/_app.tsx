import '../styles/globals.css';
import type { AppProps } from 'next/app';
import TimeAgo from 'javascript-time-ago';
import { SessionProvider } from 'next-auth/react';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
