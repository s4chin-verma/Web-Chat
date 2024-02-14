import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useAppSelector } from '@/app/hooks';

const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useAppSelector(state => state.auth);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal} className="text-black">
        Profile
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: 'rounded-xl' }}
      >
        <div className="p-4 sm:p-10 text-center overflow-y-auto rounded-xl">
          <img
            src={
              userInfo?.picture ??
              'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
            }
            alt="User Avatar"
            className="w-56 h-56 rounded-full"
          />
          <h1 className="text-2xl my-8">{userInfo?.username}</h1>
          <p className="text-lg">{userInfo?.email}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
