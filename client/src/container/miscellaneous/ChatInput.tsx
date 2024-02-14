import EmojiPicker from 'emoji-picker-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useAddMessageToServerMutation } from '@/app/api/conversationQuery';
import { Socket } from 'socket.io-client';
import { addMessage } from '@/app/slices/chatSlice';
interface ChatInputProps {
  socket: Socket;
}

const ChatInput: React.FC<ChatInputProps> = ({ socket }) => {
  const [msg, setMsg] = useState<string>('');
  const [picker, setPicker] = useState(false);
  const [addMessageToServer] = useAddMessageToServerMutation();
  const { userInfo } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { currentChatId, receiver } = useAppSelector(state => state.chat);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (msg.length === 0) return;
      if (userInfo?._id && receiver?._id && currentChatId) {
        socket.emit('send-msg', { to: receiver._id, from: userInfo._id, message: msg });

        dispatch(addMessage({ authorId: userInfo._id, msg: msg }));

        addMessageToServer({
          conversationId: currentChatId,
          body: {
            authorId: userInfo._id,
            msg: msg,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMsg('');
    }
  };

  return (
    <div className="bg-bg-secondary border-t border-border p-4 absolute bottom-0 w-3/4">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border bg-input border-border text-text-1 focus:outline-none focus:border-blue-500"
          value={msg}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMsg(event.target.value);
          }}
        />
        <Icon
          icon={'fluent-mdl2:emoji-2'}
          className="mx-4 w-8 h-8 cursor-pointer text-text-1"
          onClick={() => setPicker(!picker)}
        />
        <div className="fixed bottom-20 right-0" onMouseLeave={() => setPicker(false)}>
          {picker && (
            <EmojiPicker
              lazyLoadEmojis
              onEmojiClick={emojiObject => setMsg(prevMsg => prevMsg + emojiObject.emoji)}
            />
          )}
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
