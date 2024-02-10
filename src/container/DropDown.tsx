import { Logout } from '@/container';
import { DarkModeBtn } from '@/components';

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
          <ul className="py-2 px-3 flex flex-col justify-start gap-4">
            <li>
              <h6 className="text-black">Profile</h6>
            </li>
            <li>
              <Logout />
            </li>
            <li>
              <DarkModeBtn />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
