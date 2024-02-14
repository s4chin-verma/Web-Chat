import React from 'react';
import { Link } from 'react-router-dom';

interface FormLinkProps {
  to: string;
  children: React.ReactNode;
  classname?: string;
}

const FormLink: React.FC<FormLinkProps> = ({ to, children, classname }) => {
  return (
    <div className={`mt-6 text-blue-500 ${classname}`}>
      <Link to={to} className="hover:underline">
        {children}
      </Link>
    </div>
  );
};

export default FormLink;
