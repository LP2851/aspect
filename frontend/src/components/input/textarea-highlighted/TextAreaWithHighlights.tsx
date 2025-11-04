import React, { memo } from "react";
import "./TextAreaWithHighlights.css";
import Label from "../label/Label.tsx";

interface TextAreaWithHighlightsProps {
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

const TextAreaWithHighlights = (props: TextAreaWithHighlightsProps) => {
  const {
    label,
    value,
    onChange,
    placeholder,
    error,
    required,
    rows,
    disabled,
    id,
  } = props;
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const highlightText = (input: string) => {
    return input
      .replace(/(@\w+)/g, '<span class="mention">$1</span>')
      .replace(/(#\w+)/g, '<span class="hashtag">$1</span>')
      .replace(/(\$\w+)/g, '<span class="stock">$1</span>');
  };

  return (
    <div className="textarea-highlighted-group">
      <Label id={textareaId} message={label} required={required} />
      <div className="textarea-highlighted-wrapper">
        <div
          className="textarea-highlighted-highlights"
          dangerouslySetInnerHTML={{ __html: highlightText(value) + "\n" }}
        />
        <textarea
          id={textareaId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          className={`textarea-highlighted-input ${error ? "error" : ""}`}
          onScroll={(e: any) => {
            const highlights = e.target.parentElement?.querySelector(
              ".textarea-highlighted-highlights",
            );
            if (highlights) highlights.scrollTop = e.target.scrollTop;
          }}
        />
      </div>
    </div>
  );
};

export default memo(TextAreaWithHighlights);
