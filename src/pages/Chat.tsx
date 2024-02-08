import { ChatSideBar, ChatSection, Welcome } from '@/container';
import { useAppSelector } from '@/app/hooks';

export default function Chat() {
  const { chat } = useAppSelector(state => state.chat);
  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar />
        {chat ? <ChatSection /> : <Welcome />}
      </main>
    </>
  );
}
