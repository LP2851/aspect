import "./TextAreaInput.css";

import React from "react";

import Label from "../label/Label.tsx";

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  id?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  disabled = false,
  id,
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="textarea-group">
      <Label id={textareaId} message={label} required={required} />
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`textarea-input ${error ? "error" : ""}`}
        required={required}
      />
      {error && <span className="textarea-error-text">{error}</span>}
    </div>
  );
};

export default TextAreaInput;
