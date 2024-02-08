import { LeftChatBubble, Loader, RightChatBubble } from '@/components';
import { useGetOrCreateConversationMutation } from '@/app/api/conversationQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { setCurrentChatId, setLoading } from '@/app/slices/chatSlice';
import { Message } from '@/lib/types/section';

const ChatSection: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const { receiverId, senderId } = useAppSelector(state => state.chat);
  const [getOrCreateConversation, { data }] = useGetOrCreateConversationMutation();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        dispatch(setLoading(true));
        if (senderId && receiverId) {
          const result = await getOrCreateConversation({
            user1: senderId,
            user2: receiverId,
          }).unwrap();
          dispatch(setCurrentChatId(result._id));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (receiverId) fetchMessage();
  }, [receiverId, senderId, getOrCreateConversation, dispatch]);
  console.log('This is Data', data?.messages);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center w-full">
          <Loader classname="w-52 h-52" />
        </div>
      ) : (
        <div className="flex-1">
          {/* <!-- Chat Header --> */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">Alice</h1>
          </header>

          {/* <!-- Chat Messages --> */}
          <div className="h-screen overflow-y-auto p-4 pb-36">
            {data?.messages.map((message: Message) => {
              const { authorId, msg } = message;
              if (authorId === senderId) {
                return <LeftChatBubble key={message._id} message={msg} />;
              } else if (authorId === receiverId) {
                return <RightChatBubble key={message._id} message={msg} />;
              }
              return null;
            })}
          </div>

          {/* <!-- Chat Input --> */}
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatSection;
