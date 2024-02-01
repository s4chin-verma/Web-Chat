import { ChatSideBar, ChatSection, Welcome } from '@/container';
import { useAppSelector } from '@/app/hooks';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const { chat } = useAppSelector(state => state.chat);
  const { success } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (success === false) {
      navigate('/login');
    }
  }, [success, navigate]);

  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar />
        {chat ? <ChatSection /> : <Welcome />}
      </main>
    </>
  );
}
