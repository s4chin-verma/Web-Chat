import { setReceiver } from '@/app/slices/chatSlice';
import { MemberLabel } from '@/components';
import { Icon } from '@iconify/react';
import { Dropdown } from '@/container';
import { useState } from 'react';
import { useGetAllUsersQuery } from '@/app/api/allUserQuery';
import { useAppDispatch } from '@/app/hooks';
import { setChat } from '@/app/slices/chatSlice';

const ChatSideBar: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useGetAllUsersQuery();

  const handleClick = async (user: any) => {
    dispatch(setReceiver(user));
    dispatch(setChat(true));
  };

  return (
    <>
      <div className="min-w-[25%] bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Room</h1>
          <div className="relative">
            <Icon
              icon="mynaui:user-circle"
              className="w-8 h-8 cursor-pointer hover:text-cyan-500"
              onClick={() => {
                setDropDownOpen(!dropDownOpen);
              }}
            />
            <Dropdown dropDownOpen={dropDownOpen} />
          </div>
        </header>

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {data?.map(user => (
            <MemberLabel
              key={user._id}
              {...user}
              onClick={event => {
                event.preventDefault();
                handleClick(user);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
