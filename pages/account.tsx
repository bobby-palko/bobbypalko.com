import { GetServerSidePropsContext } from 'next/types';
import { User } from '@supabase/supabase-js';
import { supabase } from '../util/supabaseClient';
import SignOut from '../components/SignOut';

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
    props: { user },
  };
}

interface Props {
  user: User | null;
}

const AccountPage = ({ user }: Props) => (
  <>
    <h1>Account</h1>
    <pre>
      <code>{JSON.stringify(user, null, 2)}</code>
    </pre>
    <SignOut />
  </>
);

export default AccountPage;
