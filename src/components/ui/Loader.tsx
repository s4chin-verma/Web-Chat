import { AnimatedImage } from '@/components';
import loader from '@/assets/Loader.json';

const Loader: React.FC = () => {
  return <AnimatedImage data={loader} classname="h-8 w-8" />;
};

export default Loader;
