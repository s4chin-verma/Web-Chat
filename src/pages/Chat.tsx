import { ChatSideBar, ChatSection, Welcome } from '@/container';
import { useAppSelector } from '@/app/hooks';
import { Toast } from '@/components';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { showToast } from '@/lib/validators';

export default function Chat() {
  const { chat } = useAppSelector(state => state.chat);
  const { success, userInfo } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const socket = useRef(io('http://localhost:8080'));

  socket.current.emit('add-user', userInfo?._id);

  socket.current.on('user-online', data => {
    showToast(`This user Online ${data.name}`, 'info');
  });

  socket.current.on('get-users', data => {
    console.log(data);
  });

  useLayoutEffect(() => {
    if (success == false) navigate('/login');
  }, [success, navigate]);

  useEffect(() => {
    if (success === false) {
      navigate('/login');
    }
  }, [success, navigate]);

  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar />
        {chat ? <ChatSection socket={socket.current} /> : <Welcome />}
        <Toast />
      </main>
    </>
  );
}
