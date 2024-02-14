import React, { MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  classname?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, children, classname }) => {
  return (
    <button
      type="button"
      className={`py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white transition-all text-sm focus:outline-none text-sm" ${classname} `}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
