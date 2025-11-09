import { UploadStatus } from "../../types";
import { KeystoneContext } from "@keystone-6/core/types";

export const updateUploadToStatus = async (
  id: string,
  uploadStatus: UploadStatus,
  context: KeystoneContext<any>
) => {
  console.debug(`Updating upload ${id} to status ${uploadStatus}`);
  await context.db.Upload.updateOne({
    where: { id },
    data: {
      uploadStatus,
    },
  });
};

export const getUploadProjectById = async (
  id: string,
  context: KeystoneContext<any>
) => {
  return await context.db.UploadProject.findOne({ where: { id } });
};
