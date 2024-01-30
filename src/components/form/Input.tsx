import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
}

const UsernameInput: React.FC<InputProps> = ({ label, id, register }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600 my-2 text-lg">
        {label}
      </label>
      <input
        type={id}
        id={id}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete="off"
        {...register(id)}
      />
    </div>
  );
};

export default UsernameInput;
