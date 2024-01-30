import Lottie from 'lottie-react';

type PropType = {
  data: any;
  classname?: string;
};

const AnimatedImage = ({ data, classname }: PropType) => {
  return (
    <div className={`${classname}`}>
      <Lottie autoplay loop animationData={data} />
    </div>
  );
};

export default AnimatedImage;
