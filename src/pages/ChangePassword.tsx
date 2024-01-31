import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangePassInput } from '@/lib/types';
import { Input, Button, Loader } from '@/components';
import { changePassword } from '@/app/actions/passwordActions';
import { passwordValidator, showToast } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useParams } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const { register, handleSubmit } = useForm<ChangePassInput>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const { token } = useParams();

  const onSubmit: SubmitHandler<ChangePassInput> = data => {
    const { error, status } = passwordValidator(data);
    if (status === true) dispatch(changePassword({ password: data.password, token }));
    else showToast(error, 'warning');
  };

  return (
    <section className="max-w-md mx-auto mt-24 bg-white p-8 rounded-md shadow-md">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-4">Change Password!</h2>
        {loading && <Loader />}
      </div>
      <p className="text-gray-600 mb-6">Please Enter Your New Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Password" type="password" name="password" register={register} />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
        />
        <Button children="Reset Password" type="submit" className="mb-6" />
      </form>
    </section>
  );
};

export default ChangePassword;
