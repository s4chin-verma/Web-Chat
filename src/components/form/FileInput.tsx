import React, { ChangeEvent, useState } from 'react';
import { Icon } from '@iconify/react';

interface FileInputProps {
  onChange: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onChange(file);
      setSelectedFileName(file.name);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} className='invisible' accept="image/*" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer flex items-center gap-4">
        <Icon className="pointer w-8 h-8" icon={'flat-color-icons:add-image'} />
        <p>{selectedFileName || 'Choose Profile Picture'}</p>
      </label>
    </>
  );
};

export default FileInput;
