import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangePassInput } from '@/lib/types';
import { Input, Button, Loader } from '@/components';
import { changePassword } from '@/app/actions/passwordActions';
import { passwordValidator, showToast } from '@/lib/validators';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useParams } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const { register, handleSubmit } = useForm<ChangePassInput>();
  const { loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { token } = useParams();

  const onSubmit: SubmitHandler<ChangePassInput> = data => {
    const { error, status } = passwordValidator(data);
    if (status === true) dispatch(changePassword({ password: data.password, token }));
    else showToast(error, 'warning');
  };

  return (
    <section className="max-w-md mx-auto mt-24 bg-bg-secondary p-8 rounded-md shadow-md border border-border">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-4 text-text-1">Change Password!</h2>
        {loading && <Loader classname="h-8 w-8" />}
      </div>
      <p className="mb-6 text-text-2">Please Enter Your New Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Password" type="password" name="password" register={register} />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
        />
        <Button children="Reset Password" type="submit" className="mb-6 mt-4" />
      </form>
    </section>
  );
};

export default ChangePassword;
