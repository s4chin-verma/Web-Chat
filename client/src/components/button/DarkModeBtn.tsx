import { useDarkMode } from '@/lib/context/DarkModeProvider';
import { Icon } from '@iconify/react';

const DarkModeBtn: React.FC<{ onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({
  onClick,
}) => {
  const { isDarkMode, toggle } = useDarkMode();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    toggle();
  };

  return (
    <button
      className="ml-2 rounded-lg p-1 text-blue-400 hover:text-cyan-700 focus:outline-none cursor-pointer w-fit undefined duration-200"
      onClick={clickHandler}>
      <Icon icon={isDarkMode ? 'ph:moon' : 'carbon-sun'} width="26" height="26" />
    </button>
  );
};

export default DarkModeBtn;
