/* eslint-disable @next/next/no-img-element */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        primaryColor: 'green',
        fontFamily: 'Playfair Display',
      }}
    >
      <img src="/dahon.png" alt="dahon" id='dahon' />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
