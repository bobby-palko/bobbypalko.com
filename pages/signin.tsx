import { GetServerSidePropsContext } from 'next/types';
import { Input, Button, FormElement } from '@nextui-org/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { supabase } from '../util/supabaseClient';
import { SignInUpForm } from '../types/types';

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

  return {
    props: {},
  };
}

const SignInPage = () => {
  const [formData, setFormData] = useState<SignInUpForm>({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  const updateForm = (e: ChangeEvent<FormElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { user, session, error } = await supabase.auth.signIn({
      email: formData.email,
      password: formData.password,
    });
    console.log(user);
    console.log(session);
    if (error) {
      setErr(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO wrap Inputs and make these more react-like */}
      <Input
        id="email"
        type="email"
        labelPlaceholder="Username"
        value={formData.email}
        onChange={updateForm}
        helperText={err}
        helperColor="error"
      />
      <Input.Password
        id="password"
        type="password"
        labelPlaceholder="Password"
        value={formData.password}
        onChange={updateForm}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignInPage;
