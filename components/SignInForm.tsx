import { Button, Input } from '@nextui-org/react';
import { SignInUpForm } from '../types/types';

interface Props {
  handleSubmit: () => void;
  updateForm: () => void;
  formData: SignInUpForm;
}

const SignInForm = ({ handleSubmit, updateForm, formData }: Props) => {
  let x;
  return (
    <form onSubmit={handleSubmit}>
      {/* TODO wrap Inputs and make these more react-like */}
      <Input
        id="email"
        type="email"
        labelPlaceholder="Username"
        value={formData.email}
        onChange={updateForm}
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

export default SignInForm;
