import { NavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

const NavItem: React.FC<NavLinkProps> = ({ to, children, className, onClick }) => {
  return (
    <NavLink
      className={`px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${className}`}
      to={to}
      onClick={onClick}>
      {children}
    </NavLink>
  );
};

export default NavItem;
