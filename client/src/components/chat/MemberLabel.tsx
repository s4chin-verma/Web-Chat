interface MemberLabelProps {
  picture: string;
  username: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MemberLabel: React.FC<MemberLabelProps> = ({ picture, username, onClick }) => {
  return (
    <div
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
      onClick={onClick}>
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img src={picture} alt="User Avatar" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-gray-600">User</p>
      </div>
    </div>
  );
};

export default MemberLabel;
