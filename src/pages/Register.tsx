import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, Error, Input, FormLink, Button, Loader } from '@/components';
import { registerValidator, showToast } from '@/lib/utils';
import { registerUser } from '@/app/actions/authActions';
import { RootState } from '@/app/store';
import { RegisterInput } from '@/lib/types';
import { useState } from 'react';

const Register: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { register, handleSubmit } = useForm<RegisterInput>();
  const [remember, setRemember] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<RegisterInput> = data => {
    const { status, error } = registerValidator(data);
    if (status === true) dispatch(registerUser(data));
    else showToast(error, 'warning');
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          {loading && <Loader />}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <Error>{error}</Error>}
          <Input register={register} type="text" name="username" label="username" />
          <Input register={register} type="emil" name="email" label="email" />
          <Input register={register} type="password" name="password" label="password" />
          <Input register={register} type="password" name="password" label="Confirm Password" />
          <CheckBox
            id="remember me"
            label="Remember me"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <FormLink children="Forgot Password?" to="/reset-password" classname="mb-6" />
          <Button children="Sign Up" type="submit" />
        </form>
        <FormLink children="Have an account" to="/login" classname="text-center" />
      </div>
    </div>
  );
};
export default Register;
