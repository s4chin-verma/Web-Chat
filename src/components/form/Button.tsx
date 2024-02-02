import { Link } from 'react-router-dom';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  to?: string;
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, to, className, isLoading, children }) => {
  // const buttonContent = isLoading ? <AnimatedImage data={loader} classname="w-8 h-8" /> : children;

  if (to) {
    return (
      <Link to={to}>
        <button
          type={type}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ${className}`}
          onClick={onClick}
          disabled={isLoading}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ${className}`}
      onClick={onClick}
      disabled={isLoading}>
      {children}
    </button>
  );
};

export default Button;
