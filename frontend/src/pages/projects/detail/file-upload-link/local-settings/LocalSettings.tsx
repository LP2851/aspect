import { memo } from "react"
import TextInput from "../../../../../components/input/text/TextInput.tsx";

interface LocalSettingsProps {
  localLink: any;
  setLocalLink: (localLink: any) => void;
}

const LocalSettings = (
  { localLink, setLocalLink }: LocalSettingsProps,
) => {
  return <div>
    <h2 className="new-section">Local File Storage Settings</h2>
    <p className="description">Settings for local file storage settings</p>

    <TextInput key="localLink.path"
               label="Local Path"
               placeholder="Enter a local path"
               value={localLink?.path}
               required={true}
               onChange={(e) => {
                 setLocalLink({ ...localLink, path: e.target.value });
               }}
    />
  </div>;
}

export default memo(LocalSettings);
