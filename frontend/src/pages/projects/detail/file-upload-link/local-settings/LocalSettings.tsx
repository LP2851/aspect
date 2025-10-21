import { memo } from "react";

import TextInput from "../../../../../components/input/text/TextInput.tsx";
import FileDropzone from "../../../../../components/input/dropzone/FileDropzone.tsx";
import Label from "../../../../../components/input/label/Label.tsx";

interface LocalSettingsProps {
  localLink: any;
  setLocalLink: (localLink: any) => void;
}

const LocalSettings = ({ localLink, setLocalLink }: LocalSettingsProps) => {
  return (
    <div>
      <h2 className="new-section">Local File Storage Settings</h2>
      <p className="description">Settings for local file storage settings</p>

      <TextInput
        key="localLink.path"
        label="Local Path"
        placeholder="Enter a local path"
        value={localLink?.path}
        required={true}
        onChange={(e) => {
          setLocalLink({ ...localLink, path: e.target.value });
        }}
      />

      <Label
        id="fileInput"
        message="File Upload"
        required={true}
      />

      <FileDropzone
        onDrop={() => {}}
        label="Click or drag an MP4 file here to upload"
        accept="video/mp4"
        multiple={false}
        disabled={false}
      />
    </div>
  );
};

export default memo(LocalSettings);
