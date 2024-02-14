import { Logout, Profile } from '@/container';
import { DarkModeBtn } from '@/components';
import '@/container/miscellaneous/modal.css';

type DropdownProps = {
  dropDownOpen: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ dropDownOpen }) => {
  return (
    <>
      {dropDownOpen && (
        <div
          id="menuDropdown"
          className="absolute right-0 mt-2 bg-bg-secondary border border-border rounded-md shadow-lg">
          <div className="py-4 px-5 flex flex-col justify-start gap-4">
            <Profile />
            <Logout />
            <DarkModeBtn />
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
