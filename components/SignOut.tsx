import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { supabase } from '../util/supabaseClient';

const SignOut = () => {
  const { push } = useRouter();
  const handlePress = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      push('/signin');
    }
  };

  return <Button onPress={handlePress}>Sign Out</Button>;
};

export default SignOut;
