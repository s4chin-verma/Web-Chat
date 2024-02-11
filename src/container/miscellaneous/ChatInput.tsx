import EmojiPicker from 'emoji-picker-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { useAddMessageMutation } from '@/app/api/conversationQuery';

const ChatInput: React.FC = () => {
  const [msg, setMsg] = useState<string>('');
  const [picker, setPicker] = useState(false);
  const [addMessage] = useAddMessageMutation();
  const { userInfo } = useAppSelector(state => state.auth);
  const { currentChatId } = useAppSelector(state => state.chat);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (msg.length === 0) return;
      addMessage({
        conversationId: currentChatId as string,
        body: {
          authorId: userInfo?._id as string,
          msg: msg,
        },
      });
      console.log(msg);
    } catch (error) {
      console.log(error);
    } finally {
      setMsg('');
    }
  };

  return (
    <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          value={msg}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMsg(event.target.value);
          }}
        />
        <Icon
          icon={'fluent-mdl2:emoji-2'}
          className="mx-4 w-8 h-8 cursor-pointer"
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
