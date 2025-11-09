import {type DragEventHandler, memo} from "react";
import "./FileDropzone.css";

interface FileDropzoneProps {
  onDrop: DragEventHandler<HTMLInputElement>;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label: string;
}

export const FileDropzone = ({
  onDrop,
  accept,
  multiple,
  disabled,
  label,
}: FileDropzoneProps) => {
  return (
    <div className="file-dropzone-container">
      <label className={"file-dropzone" + (disabled ? " dropzone-disabled" : "")} htmlFor="fileInput">
        { label }
      </label>
      <input id="fileInput"
             type="file"
             accept={accept}
             multiple={multiple}
             disabled={disabled}
             onDrop={onDrop}
      />
    </div>
  )
}

export default memo(FileDropzone);
