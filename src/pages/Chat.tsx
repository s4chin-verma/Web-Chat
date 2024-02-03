import { useEffect } from 'react';
import { ChatSideBar, ChatSection } from '@/container';
import { useGetAllUsersQuery } from '@/app/api/allUserQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setSenderId } from '@/app/slices/chatSlice';

export default function Chat() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { currentChatId } = useSelector((state: RootState) => state.chat);

  const { data, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (userInfo) {
      dispatch(setSenderId(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {isLoading && <span>Loading......</span>}
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar users={data || []} />
        {currentChatId ? <p>Welcome to Chat Room</p> : <ChatSection />}
      </main>
    </>
  );
}
