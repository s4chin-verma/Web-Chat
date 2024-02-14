import { AnimatedImage } from '@/components';
import loader from '@/assets/Loader.json';

interface LoaderProps {
  classname: string;
}

const Loader: React.FC<LoaderProps> = ({ classname }) => {
  return <AnimatedImage data={loader} classname={`${classname}`} />;
};

export default Loader;
