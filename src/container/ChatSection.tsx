import { LeftChatBubble, Loader, RightChatBubble } from '@/components';
import { useGetOrCreateConversationMutation } from '@/app/api/conversationQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { setCurrentChatId, setLoading } from '@/app/slices/chatSlice';
import { Message } from '@/lib/types/section';

const ChatSection: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const { sender, receiver } = useAppSelector(state => state.chat);
  const [getOrCreateConversation, { data }] = useGetOrCreateConversationMutation();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        dispatch(setLoading(true));
        if (sender?._id && receiver?._id) {
          const result = await getOrCreateConversation({
            user1: sender._id,
            user2: receiver._id,
          }).unwrap();
          dispatch(setCurrentChatId(result._id));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (receiver?._id) fetchMessage();
  }, [receiver?._id, sender?._id, getOrCreateConversation, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="flex-1 items-center justify-center">
          <Loader classname="w-52 h-52" />
        </div>
      ) : (
        <div className="flex-1">
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">{receiver?.username}</h1>
          </header>
          <div className="h-screen overflow-y-auto p-4 pb-36">
            {data?.messages.map((message: Message) => {
              const { authorId, msg } = message;
              if (authorId === sender?._id) {
                return <LeftChatBubble key={message._id} message={msg} />;
              } else if (authorId === receiver?._id) {
                return <RightChatBubble key={message._id} message={msg} />;
              }
              return null;
            })}
          </div>

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
