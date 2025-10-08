import { memo } from "react";

import TextInput from "../../../../../components/input/text/TextInput.tsx";

interface GoogleDriveSettingsProps {
  googleDriveLink: any;
  setGoogleDriveLink: (googleDriveLink: any) => void;
}

const GoogleDriveSettings = ({
  googleDriveLink,
  setGoogleDriveLink,
}: GoogleDriveSettingsProps) => {
  return (
    <div>
      <h2 className="new-section">Google Drive Storage Settings</h2>
      <p className="description">Settings for Google Drive storage settings</p>

      <TextInput
        key="googleDriveLink.name"
        label="Link Name"
        placeholder="Enter link name"
        value={googleDriveLink?.name}
        required={true}
        onChange={(e) => {
          setGoogleDriveLink({ ...googleDriveLink, name: e.target.value });
        }}
      />

      <TextInput
        key="googleDriveLink.driveId"
        label="Google Drive Id"
        placeholder="Enter Google Drive id"
        value={googleDriveLink?.driveId}
        required={true}
        onChange={(e) => {
          setGoogleDriveLink({ ...googleDriveLink, driveId: e.target.value });
        }}
      />
    </div>
  );
};

export default memo(GoogleDriveSettings);
