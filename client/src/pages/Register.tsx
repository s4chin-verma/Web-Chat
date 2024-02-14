import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Error, Input, FormLink, Button, Loader, FileInput, AnimatedImage } from '@/components';
import { registerValidator, showToast } from '@/lib/validators';
import { registerUser } from '@/app/actions/authActions';
import { RegisterInput } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/lib/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setLoading } from '@/app/slices/authSlice';
import { v4 } from 'uuid';
import Compressor from 'compressorjs';
import data from '@/assets/Register.json';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { register, handleSubmit } = useForm<RegisterInput>();
  const { success, loading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (success) navigate('/chat');
  }, [navigate, success]);

  const handleFileChange = (file: File) => {
    if (file) setImageUpload(file);
  };

  const onSubmit: SubmitHandler<RegisterInput> = async data => {
    const { status, error } = registerValidator(data);
    if (status == true) {
      dispatch(setLoading());
      if (imageUpload) {
        const compressedResult = await new Promise<Blob>(resolve => {
          showToast('Compressing Your Profile Picture', 'info');
          new Compressor(imageUpload, {
            quality: 0.8,
            success: result => {
              resolve(result);
            },
          });
        });

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        await uploadBytes(imageRef, compressedResult);

        const downloadURL = await getDownloadURL(imageRef);
        const userData = { ...data, picture: downloadURL };
        dispatch(registerUser(userData));
      } else dispatch(registerUser(data));
    } else showToast(error, 'warning');
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:items-center lg:justify-center">
        <AnimatedImage data={data} classname="h-4/6 w-4/6" />
      </div>
      <div className="lg:py-28 lg:px-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          {loading && <Loader classname="h-8 w-8" />}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <Error>{error}</Error>}
          <Input register={register} type="text" name="username" label="username" />
          <Input register={register} type="emil" name="email" label="email" />
          <Input register={register} type="password" name="password" label="password" />
          <Input
            register={register}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
          />
          <FileInput onChange={handleFileChange} />
          <FormLink children="Forgot Password?" to="/reset-password" classname="mb-6" />
          <Button children="Sign Up" type="submit" />
        </form>
        <FormLink children="Have an account" to="/login" classname="text-center" />
      </div>
    </div>
  );
};
export default Register;
