import { ChatSideBar, ChatSection } from '@/container';
import { useGetAllUsersQuery } from '@/app/api/apiSlice';

export default function Chat() {
  const { data, isSuccess } = useGetAllUsersQuery();
  console.log(data);
  if (!isSuccess || !data) {
    // Handle loading state or other cases where data is not available
    return <p>Loading...</p>;
  }
  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <ChatSideBar users={data} />
        <ChatSection />
      </main>
    </>
  );
}
