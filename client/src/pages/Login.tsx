import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Error, Loader, Input, FormLink, CheckBox, AnimatedImage } from '@/components';
import { LoginInput } from '@/lib/types';
import { userLogin } from '@/app/actions/authActions';
import { LoginValidator, showToast } from '@/lib/validators';
import { RootState } from '@/app/store';
import data from '@/assets/Login.json';

const LoginPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<LoginInput>();
  const { error, loading, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (success === true) navigate('/chat');
  }, [navigate, success]);

  const onSubmit: SubmitHandler<LoginInput> = data => {
    const { status, error } = LoginValidator(data);
    if (status === true) dispatch(userLogin(data));
    else showToast(error, 'warning');
  };

  return (
    <section className="bg-bg flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:items-center lg:justify-center">
        <AnimatedImage data={data} classname="h-4/6 w-4/6" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div className="flex gap-6">
          <h1 className="text-2xl text-text-1 font-semibold mb-4">Login</h1>
          {loading && <Loader classname="h-8 w-8" />}
          {error && <Error>{error}</Error>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} name="username" type="text" label="Username" />
          <Input register={register} name="password" type="password" label="Password" />
          <CheckBox
            label="Remember Me"
            id="remember me"
            checked={rememberMe}
            onChange={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <FormLink children="Forgot Password?" to="/reset-password" classname="mb-6" />
          <Button children="Login" type="submit" />
        </form>
        <FormLink children="Sign up Here" to="/register" classname="text-center" />
      </div>
    </section>
  );
};

export default LoginPage;
