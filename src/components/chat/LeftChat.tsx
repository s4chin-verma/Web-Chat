import { useAppSelector } from '@/app/hooks';

interface LeftChatBubbleProps {
  message: string;
}

const LeftChatBubble: React.FC<LeftChatBubbleProps> = ({ message }) => {
  const senderPictureUrl = useAppSelector(state => state.chat.sender?.picture);

  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <img
          src={
            senderPictureUrl ??
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
          }
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LeftChatBubble;
