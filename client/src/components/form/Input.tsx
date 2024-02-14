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
      <label htmlFor={name} className="block text-text-2 my-2 text-lg capitalize">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="w-full bg-input text-text-1 border border-border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
        // autoComplete="off"
        {...register(name)}
      />
    </div>
  );
};

export default UsernameInput;
