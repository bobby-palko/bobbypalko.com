import { ChangeEvent, FormEvent, useState } from 'react';
import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { FormElement } from '@nextui-org/react';
import { SignInUpForm } from '../types/types';
import { supabase } from '../util/supabaseClient';
import SignInForm from '../components/SignInForm';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  // Check if user is authenticated
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If they are, redirect to the home page
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const SignInPage = () => {
  const [formData, setFormData] = useState<SignInUpForm>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const updateForm = (e: ChangeEvent<FormElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isSignUp) {
      const { error } = await supabase.auth.signIn({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
      } else {
        push('/account');
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
      } else {
        // TODO hide form and set a note saying check email
      }
    }
  };

  return (
    <SignInForm
      updateForm={updateForm}
      handleSubmit={handleSubmit}
      formData={formData}
      loading={loading}
      isSignUp={isSignUp}
      handleShowSignUp={handleShowSignUp}
    />
  );
};

export default SignInPage;
