import { useForm, SubmitHandler } from 'react-hook-form';
import { ResetPassInput } from '@/lib/types';
import { Input, Button, Loader } from '@/components';
import { resetPassword } from '@/app/api/authApi';
import { emailValidator, showToast } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const ChangePassword: React.FC = () => {
  const { register, handleSubmit } = useForm<ResetPassInput>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();

  const onSubmit: SubmitHandler<ResetPassInput> = data => {
    const { error, status } = emailValidator(data.email);
    if (status === true) dispatch(resetPassword(data));
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
        <Input label="Password" id="password" register={register} />
        <Input label="Confirm Password" id="confirmPassword" register={register} />
        <Button children="Reset Password" type="submit" className="mb-6" />
      </form>
    </section>
  );
};

export default ChangePassword;
