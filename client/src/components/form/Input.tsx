import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type: string;
}

const UsernameInput: React.FC<InputProps> = ({ label, name, type, register }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-600 my-2 text-lg capitalize">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        // autoComplete="off"
        {...register(name)}
      />
    </div>
  );
};

export default UsernameInput;
