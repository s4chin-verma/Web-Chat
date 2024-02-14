import React, { ReactNode, HTMLAttributes } from "react";

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children, ...props }) => {
  return (
    <div className="text-red-600 text-center my-2" {...props}>
      {children}
    </div>
  );
};

export default Error;
