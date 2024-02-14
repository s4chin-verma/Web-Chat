import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppSelector } from '@/app/hooks';
import { Icon } from '@iconify/react';
import 'react-responsive-modal/styles.css';

const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useAppSelector(state => state.auth);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal} className="text-text-1 hover:text-blue-400">
        Profile
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: 'profileModal' }}
        closeIcon={<Icon icon="material-symbols:close" className="text-text-1 h-8 w-8" />}>
        <div className="p-4 sm:p-10 text-center overflow-y-auto rounded-xl bg-bg-secondary">
          <img
            src={
              userInfo?.picture ??
              'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
            }
            alt="User Avatar"
            className="w-56 h-56 rounded-full"
          />
          <h1 className="text-2xl my-8 text-text-1 capitalize">{userInfo?.username}</h1>
          <p className="text-lg text-text-2">{userInfo?.email}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
