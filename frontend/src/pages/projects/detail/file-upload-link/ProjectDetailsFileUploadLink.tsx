import { memo, useEffect, useState } from "react";

import Button from "../../../../components/button/Button.tsx";
import Card from "../../../../components/card/Card.tsx";
import Select from "../../../../components/input/select/Select.tsx";
import {
  useCreateUploadLocationMutation,
  useDeleteUploadLocationMutation,
  useUpdateUploadLocationMutation,
} from "../../../../generated/graphql.ts";
import { useToast } from "../../../../providers/toast/ToastProvider.tsx";
import { isFeatureLocalProjectFileSourceEnabled } from "../../../../utils/features.ts";
import GoogleDriveSettings from "./google-drive-settings/GoogleDriveSettings.tsx";
import LocalSettings from "./local-settings/LocalSettings.tsx";
import S3Settings from "./s3-settings/S3Settings.tsx";

interface ProjectDetailsFileUploadLinkProps {
  project: any;
  setProject: (project: any) => void;
  onSave: () => void;
}

const ProjectDetailsFileUploadLink = ({
  project,
  onSave,
}: ProjectDetailsFileUploadLinkProps) => {
  const { showToast } = useToast();
  const [locationType, setLocationType] = useState<string | undefined>();
  const [localLink, setLocalLink] = useState<any | undefined>();
  const [s3Link, setS3Link] = useState<any | undefined>();
  const [googleDriveLink, setGoogleDriveLink] = useState<any | undefined>();

  const [createUploadLocation] = useCreateUploadLocationMutation();
  const [updateUploadLocation] = useUpdateUploadLocationMutation();
  const [deleteUploadLocation] = useDeleteUploadLocationMutation();

  useEffect(() => {
    const type = project?.uploadLocation?.type;
    setLocationType(type);

    if (type === "LOCAL") setLocalLink(project.uploadLocation?.localLink);
    if (type === "S3") setS3Link(project.uploadLocation?.s3Link);
    if (type === "G_DRIVE") setGoogleDriveLink(project.uploadLocation?.googleDriveLink);
  }, [project]);

  const selectOptions = [
    { value: "G_DRIVE", label: "Google Drive" },
    { value: "S3", label: "S3" },
  ];

  if (isFeatureLocalProjectFileSourceEnabled()) {
    selectOptions.push({ value: "LOCAL", label: "Local" });
  }

  const createUploadLocationLink = async () => {
    if (!locationType) return;

    try {
      await createUploadLocation({
        variables: {
          data: {
            type: locationType,
            project: { connect: { id: project.id } },
          },
        },
      });
      onSave();
      showToast("success", "Upload location created");
    } catch (err: any) {
      showToast("error", "Failed to create upload location: " + err.message);
    }
  };

  const onSaveUploadLocation = async () => {
    try {
      if (!locationType) {
        if (project.uploadLocation) {
          await deleteUploadLocation({
            variables: { where: { id: project.uploadLocation.id } },
          });
          setLocalLink(undefined);
          setS3Link(undefined);
          setGoogleDriveLink(undefined);
          onSave();
          showToast("success", "Upload location cleared");
        }
        return;
      }

      if (project.uploadLocation) {
        if (locationType !== project.uploadLocation.type) {
          await deleteUploadLocation({
            variables: { where: { id: project.uploadLocation.id } },
          });

          if (locationType) {
            await createUploadLocationLink();
          }

          onSave();
          return;
        }

        await updateUploadLocation({
          variables: {
            where: { id: project.uploadLocation.id },
            data: {
              project: { connect: { id: project.id } },
              type: locationType,
            },
          },
        });
        onSave();
        showToast("success", "Upload location updated");
        return;
      }

      if (locationType) {
        await createUploadLocationLink();
      }
    } catch (err: any) {
      showToast("error", "Failed to save upload location: " + err.message);
    }
  };

  return (
    <Card className="section scroll-container card-height-setting">
      <h2>File Upload Link</h2>
      <p className="section-description">Upload location for files for this project</p>

      <Select
        id="uploadLocation"
        key="uploadLocation.type"
        label="Upload Location"
        value={locationType ?? ""}
        defaultOption="Select an option"
        defaultValue=""
        required={true}
        options={selectOptions}
        onChange={(e) => setLocationType(e.target.value || undefined)}
      />

      {locationType === "LOCAL" && (
        <LocalSettings localLink={localLink} setLocalLink={setLocalLink} />
      )}

      {locationType === "G_DRIVE" && (
        <GoogleDriveSettings
          googleDriveLink={googleDriveLink}
          setGoogleDriveLink={setGoogleDriveLink}
        />
      )}

      {locationType === "S3" && (
        <S3Settings s3Link={s3Link} setS3Link={setS3Link} />
      )}

      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        onClick={onSaveUploadLocation}
      >
        Save Changes
      </Button>
    </Card>
  );
};

export default memo(ProjectDetailsFileUploadLink);
