import { useAppSelector } from '@/app/hooks';

interface RightChatBubbleProps {
  message: string;
}

const RightChatBubble: React.FC<RightChatBubbleProps> = ({ message }) => {
  const receiverPictureUrl = useAppSelector(state => state.chat.receiverPicture);

  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p>{message}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src={
            receiverPictureUrl ??
            'https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256'
          }
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default RightChatBubble;
