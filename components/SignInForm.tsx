import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  Button,
  Card,
  FormElement,
  Grid,
  Input,
  Loading,
  SimpleColors,
  Text,
} from '@nextui-org/react';
import { SignInUpForm } from '../types/types';

interface Props {
  handleSubmit: (e: FormEvent) => void;
  updateForm: (e: ChangeEvent<FormElement>) => void;
  handleShowSignUp: () => void;
  formData: SignInUpForm;
  loading: boolean;
  isSignUp: boolean;
}

interface InputHelper {
  text: string;
  color: SimpleColors;
}

const SignInForm = ({
  handleSubmit,
  updateForm,
  formData,
  loading,
  isSignUp,
  handleShowSignUp,
}: Props) => {
  const [verifyPw, setVerifyPw] = useState('');
  const updateVerifyPw = (e: ChangeEvent<FormElement>) => {
    setVerifyPw(e.currentTarget.value);
  };

  const validateEmail = (target: string) =>
    target.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const helper = useMemo<InputHelper>(() => {
    if (!formData.email) {
      return {
        text: '',
        color: 'default',
      };
    }
    const isValid = validateEmail(formData.email);
    return {
      text: isValid ? '' : 'Enter a valid email',
      color: isValid ? 'success' : 'error',
    };
  }, [formData.email]);

  const validateBeforeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(e);
  };
  return (
    <Card css={{ mw: '500px' }}>
      <Grid.Container gap={3} direction="column" justify="center">
        <Grid>
          <Text h1>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
          <Button
            type="button"
            onClick={handleShowSignUp}
            auto
            disabled={loading}
            light
            color="secondary"
          >
            {isSignUp ? 'Already a user? Log In!' : 'Not a user? Sign up!'}
          </Button>
        </Grid>
        <form onSubmit={validateBeforeSubmit}>
          <Grid>
            <Input
              clearable
              helperColor={helper.color}
              helperText={helper.text}
              id="email"
              type="email"
              labelPlaceholder="Username"
              value={formData.email}
              onChange={updateForm}
              status="primary"
            />
          </Grid>
          <Grid>
            <Input.Password
              clearable
              id="password"
              type="password"
              labelPlaceholder="Password"
              value={formData.password}
              onChange={updateForm}
              status="primary"
            />
          </Grid>
          {isSignUp && (
            <Grid>
              <Input.Password
                clearable
                id="verify-password"
                type="password"
                labelPlaceholder="Verify Password"
                value={verifyPw}
                onChange={updateVerifyPw}
                status="primary"
              />
            </Grid>
          )}
          <Grid>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loading />
              ) : (
                <span>{isSignUp ? 'Sign Up!' : 'Sign In'}</span>
              )}
            </Button>
          </Grid>
        </form>
      </Grid.Container>
    </Card>
  );
};

export default SignInForm;
