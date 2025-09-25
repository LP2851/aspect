export interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Project {
  id: string;
  projectName: string;
  status: string;
  templateId: string;
  configuration: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  template?: Template;
}

export const enum ProjectStatus {
  CREATED = "CREATED",
  READY = "READY",
  QUEUED = "QUEUED",
  UPLOADING = "UPLOADING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const enum UploadLocationType {
  S3 = "S3",
  LOCAL = "LOCAL",
  GOOGLE_DRIVE = "G_DRIVE",
}

export interface UploadLocationS3 {
  bucket: string;
  key: string;
}

export interface UploadLocationLocal {
  path: string;
}

export interface UploadLocationGoogleDrive {
  id: string;
  name: string;
}

export interface UploadLocation {
  type?: UploadLocationType;
  s3?: UploadLocationS3;
  local?: UploadLocationLocal;
  googleDrive?: UploadLocationGoogleDrive;
}

export const enum UploadPlatform {
  TIK_TOK = "TIK TOK",
  YOUTUBE = "YOUTUBE",
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  X = "X",
}

export const enum UploadStatus {
  PENDING_RELEASE = "PENDING RELEASE",
  QUEUED = "QUEUED",
  UPLOADING = "UPLOADING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Upload {
  id: string;
  uploadTo: UploadPlatform;
  uploadStatus: UploadStatus;
}

export interface UploadProject {
  id: string;
  projectName: string;
  description: string;
  status: ProjectStatus;

  uploadLocation: UploadLocation;
  uploadsTo: Upload[];

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
