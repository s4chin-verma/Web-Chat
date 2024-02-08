import { Icon } from '@iconify/react';

type DropdownProps = {
  dropDownOpen: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ dropDownOpen }) => {
  return (
    <>
      {dropDownOpen && (
        <div
          id="menuDropdown"
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2 px-3">
            <li>
              <button className="px-4 py-2 text-gray-800 hover:text-gray-400 flex">
                <Icon icon="solar:user-id-linear" className="h-8 w-8" />
                Profile
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 text-gray-800 hover:text-gray-400">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
