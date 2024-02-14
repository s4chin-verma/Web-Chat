import { AnimatedImage } from '@/components';
import animation from '@/assets/Welcome.json';
import { useAppSelector } from '@/app/hooks';

const Welcome: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.auth);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 pb-36">
      <AnimatedImage data={animation} classname="h-52 w-52" />
      <h1 className="text-3xl font-bold text-center mt-4 mb-8 text-text-1 flex gap-2">
        Welcome to the Chat App
        <p className="text-text-1 capitalize">{userInfo?.username}</p>
      </h1>
      <p className="text-lg text-text-2">
        Select any user to start a chat and enjoy seamless communication.
      </p>
    </div>
  );
};

export default Welcome;
