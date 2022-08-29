import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { globalCss, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../util/supabaseClient';
import { lightTheme, darkTheme } from '../themes';

async function handleAuthChange(
  event: AuthChangeEvent,
  session: Session | null
) {
  await fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  });
}

// make the surrounding nextjs div extend the viewport height
const globalStyles = globalCss({
  '#__next': {
    '& div[data-overlay-container]': {
      height: '100vh',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === 'SIGNED_IN') {
          // TODO: Actions to Perform on Sign In?
        } else if (event === 'SIGNED_OUT') {
          // TODO: Actions to Perform on Logout?
        }
      }
    );
    return () => {
      if (data) {
        data.unsubscribe();
      } else console.log(error);
    };
  }, []);

  globalStyles();

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
