import { useEffect } from 'react';
import { ChatSideBar, ChatSection, Welcome } from '@/container';
import { useGetAllUsersQuery } from '@/app/api/allUserQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setSenderId } from '@/app/slices/chatSlice';
import { Loader } from '@/components';

export default function Chat() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { currentChatId } = useAppSelector(state => state.chat);

  const { data, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (userInfo) {
      dispatch(setSenderId(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {isLoading && <Loader classname='h-52 w-52'/>}
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar users={data || []} />
        {currentChatId === null ? <Welcome /> : <ChatSection />}
      </main>
    </>
  );
}
