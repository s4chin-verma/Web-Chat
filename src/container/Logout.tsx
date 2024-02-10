import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Icon } from '@iconify/react';
import { Modal } from 'react-responsive-modal';

const Logout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal} className="text-black">
        Logout
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="p-4 sm:p-10 text-center overflow-y-auto rounded-xl">
          <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
            <Icon icon={'emojione-v1:warning'} className="w-6 h-6" />
          </span>

          <h3 className="mb-2 text-2xl font-bold text-gray-800">Sign out</h3>
          <p className="text-gray-500">Are you sure you would like to sign out of your account?</p>

          <div className="mt-6 flex justify-center gap-x-4">
            <button
              type="button"
              className="y-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm"
              onClick={onCloseModal}>
              Sign Out
            </button>
            <button
              type="button"
              className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm"
              onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Logout;
