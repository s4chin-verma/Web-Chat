import { NavItem, NavButton, DarkModeBtn } from '@/components';
import { useState } from 'react';
import { navbarSection } from '@/lib/navbar';
import { useWindowWidth } from '@/context/windowWidth';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const { navLinks } = navbarSection;
  const windowWidth = useWindowWidth();

  return (
    <div className="fixed inset-x-0 top-0 right-0 z-50 ">
      <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <Link
                to="/"
                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                Chat Room
              </Link>
              <NavButton
                onClick={() => setNavbarCollapsed(!navbarCollapsed)}
                navbarCollapsed={navbarCollapsed}
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              />
            </div>
            {(navbarCollapsed || windowWidth > 768) && (
              <nav className="flex flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row gap-2">
                {navLinks.map((navLink, index) => (
                  <NavItem
                    key={index}
                    to={navLink.url}
                    children={navLink.name}
                    onClick={() => setNavbarCollapsed(false)}
                  />
                ))}
                <DarkModeBtn />
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
