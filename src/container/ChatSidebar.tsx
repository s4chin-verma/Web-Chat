import { setCurrentChatId, setReceiverId, setLoading } from '@/app/slices/chatSlice';
import { MemberLabel } from '@/components';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useGetOrCreateConversationMutation } from '@/app/api/conversationQuery';
import { useEffect } from 'react';

type User = {
  _id: string;
  username: string;
  picture: string;
};

type ChatSideBarProps = {
  users: User[];
};

const ChatSideBar: React.FC<ChatSideBarProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const { receiverId, senderId } = useAppSelector(state => state.chat);
  const [getOrCreateConversation] = useGetOrCreateConversationMutation({
    fixedCacheKey: 'shared-update-post',
  });

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

  const handleClick = async (id: string) => {
    dispatch(setReceiverId(id));
  };

  return (
    <>
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* <!-- Sidebar Header --> */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Room</h1>
          <div className="relative">
            <button id="menuButton" className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* <!-- Menu Dropdown --> */}
            <div
              id="menuDropdown"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
              <ul className="py-2 px-3">
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                    Option 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                    Option 2
                  </a>
                </li>
                {/* <!-- Add more menu options here --> */}
              </ul>
            </div>
          </div>
        </header>

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {users.map(user => (
            <MemberLabel
              key={user._id}
              {...user}
              onClick={event => {
                event.preventDefault();
                handleClick(user._id);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
