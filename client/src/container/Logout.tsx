import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Icon } from '@iconify/react';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';
import { resetChatState } from '@/app/slices/chatSlice';
import { useAppDispatch } from '@/app/hooks';
import { resetAuthState } from '@/app/slices/authSlice';
import { CustomButton } from '@/components';

const Logout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch(resetAuthState());
      dispatch(resetChatState());
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div>
      <button onClick={onOpenModal} className="text-text-1 hover:text-blue-400">
        Logout
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: 'logoutModal' }}
        closeIcon={<Icon icon="material-symbols:close" className='text-text-1 h-8 w-8'/>}>
        <div className="p-4 sm:p-10 text-center overflow-y-auto rounded-xl bg-bg-secondary">
          <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
            <Icon icon={'emojione-v1:warning'} className="w-6 h-6" />
          </span>

          <h3 className="mb-2 text-2xl font-bold text-text-1">Sign out</h3>
          <p className="text-text-2">Are you sure you would like to sign out of your account?</p>

          <div className="mt-6 flex justify-center gap-x-8">
            <CustomButton
              children="Sign Out"
              onClick={handleLogout}
              classname="bg-green-500 hover:bg-green-600"
            />
            <CustomButton
              children="Cancel"
              onClick={onCloseModal}
              classname="bg-red-500 hover:bg-red-600"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Logout;
