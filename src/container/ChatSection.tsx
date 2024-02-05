import { LeftChatBubble, Loader, RightChatBubble } from '@/components';
import { useAppSelector } from '@/app/hooks';

const ChatSection: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.chat);

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
            <LeftChatBubble message="Hello MOther Fucker" />
            <RightChatBubble message="Bol Bhosdivale" />
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
