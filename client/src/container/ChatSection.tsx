import { LeftChatBubble, RightChatBubble, Loader } from '@/components';
import { useGetOrCreateConversationMutation } from '@/app/api/conversationQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect, useRef } from 'react';
import { addMessage, setCurrentChatId, setLoading, setMessages } from '@/app/slices/chatSlice';
import { Message } from '@/lib/types/section';
import { ChatInput } from '@/container';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io-client';

interface ChatSectionProps {
  socket: Socket;
}

const ChatSection: React.FC<ChatSectionProps> = ({ socket }) => {
  const { isLoading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { receiver, messages } = useAppSelector(state => state.chat);
  const [getOrCreateConversation] = useGetOrCreateConversationMutation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(setLoading(true));
        if (userInfo?._id && receiver?._id) {
          const result = await getOrCreateConversation({
            user1: userInfo._id,
            user2: receiver._id,
          }).unwrap();
          dispatch(setCurrentChatId(result._id));
          dispatch(setMessages(result.messages));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (receiver?._id) fetchMessages();
  }, [receiver?._id, userInfo?._id, getOrCreateConversation, dispatch]);

  useEffect(() => {
    if (socket) {
      const handleMessageReceive = (data: Message) => {
        dispatch(addMessage(data));
      };
      socket.on('msg-receive', handleMessageReceive);
      return () => {
        socket.off('msg-receive', handleMessageReceive);
      };
    }
  }, [socket, dispatch]);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  return (
    <>
      {isLoading ? (
        <div className="flex-1 items-center justify-center">
          <Loader classname="w-52 h-52" />
        </div>
      ) : (
        <div className="flex-1">
          <header className="bg-bg-secondary p-4 text-gray-700">
            <h1 className="text-2xl font-semibold text-text-1 capitalize">{receiver?.username}</h1>
          </header>
          <div className="h-screen overflow-y-auto p-4 pb-36">
            {messages?.map((message: Message) => {
              const { authorId, msg } = message;
              return (
                <div key={uuidv4()}>
                  {authorId === receiver?._id ? (
                    <LeftChatBubble message={msg} />
                  ) : (
                    <RightChatBubble message={msg} />
                  )}
                </div>
              );
            })}
            <div ref={scrollRef}></div>
          </div>
          <ChatInput socket={socket} />
        </div>
      )}
    </>
  );
};

export default ChatSection;
