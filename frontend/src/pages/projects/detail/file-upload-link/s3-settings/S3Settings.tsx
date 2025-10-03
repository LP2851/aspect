import TextInput from "../../../../../components/input/text/TextInput.tsx";
import {memo} from "react"

interface S3SettingsProps {
  s3Link: any;
  setS3Link: (s3Link: any) => void;
}

const S3Settings = (
  { s3Link, setS3Link }: S3SettingsProps,
) => {
  return <div>
    <h2 className="new-section">AWS S3 Storage Settings</h2>
    <p className="description">Settings for S3 storage settings</p>

    <TextInput key="s3Link.bucket"
               label="Bucket URL"
               placeholder="Enter a bucket url"
               value={s3Link?.bucket}
               required={true}
               onChange={(e) => {
                 setS3Link({ ...s3Link, bucket: e.target.value });
               }}
    />

    <TextInput key="s3Link.key"
               label="Bucket Key"
               placeholder="Enter a bucket key"
               inputType="password"
               value={s3Link?.key}
               required={true}
               onChange={(e) => {
                 setS3Link({ ...s3Link, key: e.target.value });
               }}
    />
  </div>
}

export default memo(S3Settings);
