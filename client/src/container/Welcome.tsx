import { AnimatedImage } from '@/components';
import animation from '@/assets/Welcome.json';

const Welcome: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 pb-36">
      <AnimatedImage data={animation} classname="h-52 w-52" />
      <h1 className="text-3xl font-bold text-center mt-4 mb-8">Welcome to the Chat App</h1>
      <p className="text-lg text-gray-600">
        Select any user to start a chat and enjoy seamless communication.
      </p>
    </div>
  );
};

export default Welcome;
