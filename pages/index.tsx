import { GetServerSidePropsContext } from 'next/types';
import { useTheme, Text, Switch } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { supabase } from '../util/supabaseClient';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  // Check if user is authenticated
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If not, redirect to the signin page
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const HomePage = () => {
  const { theme, isDark, type } = useTheme();
  const { setTheme } = useNextTheme();
  return (
    <div>
      <Text
        css={{
          color: theme?.colors.primary.value,
        }}
      >
        I'm the home page!
      </Text>
      <div>
        <Text>The current theme is: {type}</Text>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
};

export default HomePage;
