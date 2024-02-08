import { setReceiverId } from '@/app/slices/chatSlice';
import { MemberLabel } from '@/components';
import { Icon } from '@iconify/react';
import Dropdown from './DropDown';
import { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from '@/app/api/allUserQuery';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setSenderId, setChat } from '@/app/slices/chatSlice';

const ChatSideBar: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { data } = useGetAllUsersQuery();

  useEffect(() => {
    if (userInfo) {
      dispatch(setSenderId(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const handleClick = async (id: string) => {
    dispatch(setReceiverId(id));
    dispatch(setChat(true));
  };

  return (
    <>
      <div className="w-1/4 bg-white border-r border-gray-300">
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
