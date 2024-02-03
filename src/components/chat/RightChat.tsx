import React from 'react';

interface RightChatBubbleProps {
  avatarSrc: string;
  message: string;
}

const RightChatBubble: React.FC<RightChatBubbleProps> = ({ avatarSrc, message }) => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p>{message}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img src={avatarSrc} alt="My Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default RightChatBubble;
