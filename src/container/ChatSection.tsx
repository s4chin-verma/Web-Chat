import { LeftChatBubble, Loader, RightChatBubble } from '@/components';
import { useGetOrCreateConversationMutation } from '@/app/api/conversationQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect, useRef } from 'react';
import { setCurrentChatId, setLoading } from '@/app/slices/chatSlice';
import { Message } from '@/lib/types/section';
import { ChatInput } from '@/container';

const ChatSection: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { receiver } = useAppSelector(state => state.chat);
  const [getOrCreateConversation, { data }] = useGetOrCreateConversationMutation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        dispatch(setLoading(true));
        if (userInfo?._id && receiver?._id) {
          const result = await getOrCreateConversation({
            user1: userInfo._id,
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
  }, [receiver?._id, userInfo?._id, getOrCreateConversation, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

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
              return (
                <div key={message._id}>
                  {authorId === receiver?._id ? (
                    <LeftChatBubble message={msg} />
                  ) : (
                    <RightChatBubble message={msg} />
                  )}
                </div>
              );
            })}
            {/* <div ref={scrollRef}></div> */}
          </div>
          <ChatInput />
        </div>
      )}
    </>
  );
};

export default ChatSection;
