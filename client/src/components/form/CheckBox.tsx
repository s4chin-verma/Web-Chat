import React, { ChangeEvent } from 'react';

type CheckBoxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="text-blue-500"
      />
      <label htmlFor={id} className="text-gray-600 ml-2">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
