import Card from "../../../../components/card/Card.tsx";
import {memo, useEffect, useState} from "react";
import Select from "../../../../components/input/select/Select.tsx";
import {isFeatureLocalProjectFileSourceEnabled} from "../../../../utils/features.ts";
import Button from "../../../../components/button/Button.tsx";
import {
  useCreateUploadLocationMutation,
  useDeleteUploadLocationMutation,
  useUpdateUploadLocationMutation
} from "../../../../generated/graphql.ts";
import {useToast} from "../../../../providers/toast/ToastProvider.tsx";
import GoogleDriveSettings from "./google-drive-settings/GoogleDriveSettings.tsx";
import S3Settings from "./s3-settings/S3Settings.tsx";
import LocalSettings from "./local-settings/LocalSettings.tsx";

interface ProjectDetailsFileUploadLinkProps {
  project: any;
  setProject: (project: any) => void;
  onSave: () => void;
}

const ProjectDetailsFileUploadLink = ({project, onSave}: ProjectDetailsFileUploadLinkProps) => {
  const { showToast } = useToast();
  const [locationType, setLocationType] = useState<string | undefined>();
  const [localLink, setLocalLink] = useState<any | undefined>();
  const [s3Link, setS3Link] = useState<any | undefined>();
  const [googleDriveLink, setGoogleDriveLink] = useState<any | undefined>();


  const [createUploadLocation] = useCreateUploadLocationMutation();
  const [updateUploadLocation] = useUpdateUploadLocationMutation();
  const [deleteUploadLocation] = useDeleteUploadLocationMutation();


  useEffect(() => {
    setLocationType(project.uploadLocation?.type);

    if (locationType === "LOCAL") {
      setLocalLink(project.uploadLocation?.localLink);
    }
    if (locationType === "S3") {
      setS3Link(project.uploadLocation?.s3Link);
    }
    if (locationType === "G_DRIVE") {
      setGoogleDriveLink(project.uploadLocation?.googleDriveLink);
    }
  }, [project]);

  const selectOptions = [
    {value: "G_DRIVE", label: "Google Drive"},
    {value: "S3", label: "S3"},
  ];

  if (isFeatureLocalProjectFileSourceEnabled()) {
    selectOptions.push({value: "LOCAL", label: "Local"});
  }

  const createUploadLocationLink = () => {
    if (!locationType) {
      // TODO add error message on component
      showToast("error", "Cannot save upload location: No location type selected");
      return;
    }

    // TODO get details for link
    createUploadLocation({
      variables: {
        data: {
          type: locationType,
          project: {
            connect: {
              id: project.id
            }
          }
        }
      }
    })
      .then(() => {
        onSave();
      })
      .catch((err) => {
        // TODO add error message on component
        showToast("error", "Failed to create upload location link: " + err.message);
      });
  }

  const onSaveUploadLocation = () => {
    if (project.uploadLocation) {
      if (locationType != project.uploadLocation.type) {
        deleteUploadLocation({
          variables: {
            where: {
              id: project.uploadLocation.id
            }
          }
        })
        // TODO delete location link data (urls etc)
        .then(() => {
          if (locationType) {
            createUploadLocationLink();
          }
          onSave();
        });
        return;
      }
      // update location link data (urls etc)
      updateUploadLocation({
        variables: {
          where: {
            id: project.uploadLocation.id,
          },
          data: {
            project: {
              connect: {
                id: project.id,
              },
            },
            type: locationType,
          },
        }
      }).then(() => {
        onSave();
      })
        .catch((err) => showToast("error", "Failed to update upload location link: " + err.message));
      return;
    }

    createUploadLocationLink();
  }

  return <Card>
    <h2>File Upload Link</h2>
    <p className="description">Upload location for files for this project</p>

    <Select id="uploadLocation"
            key="uploadLocation.type"
            label="Upload Location"
            value={locationType}
            defaultOption={"Select an option"}
            options={selectOptions}
            onChange={(e) => setLocationType(e.target.value)}
    />

    {
      locationType === "LOCAL" &&
        <LocalSettings localLink={localLink}
                       setLocalLink={setLocalLink} />
    }

    {
      locationType === "G_DRIVE" &&
        <GoogleDriveSettings googleDriveLink={googleDriveLink}
                             setGoogleDriveLink={setGoogleDriveLink} />
    }

    {
      locationType === "S3" &&
        <S3Settings s3Link={s3Link}
                    setS3Link={setS3Link} />
    }

    <Button style={{ marginTop: "2rem", width: "100%" }} onClick={onSaveUploadLocation}>Save Changes</Button>
  </Card>
}

export default memo(ProjectDetailsFileUploadLink);
