interface MemberLabelProps {
  picture: string;
  username: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MemberLabel: React.FC<MemberLabelProps> = ({ picture, username, onClick }) => {
  return (
    <div
      className="flex items-center mb-4 cursor-pointer hover:bg-accent p-2 rounded-md border border-border"
      onClick={onClick}>
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img src={picture} alt="User Avatar" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-lg text-text-1 font-semibold capitalize">{username}</h2>
        <p className="text-text-2">User</p>
      </div>
    </div>
  );
};

export default MemberLabel;
