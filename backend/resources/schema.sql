CREATE TABLE "templates" (
  "id" VARCHAR(36) PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" DATETIME
);

CREATE TABLE "projects" (
  "id" VARCHAR(36) PRIMARY KEY,
  "project_name" TEXT UNIQUE NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'READY' CHECK (status IN ('COMPLETE', 'FAILURE', 'PROCESSING', 'READY')),
  "template_id" VARCHAR(36) NOT NULL,
  "configuration" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" DATETIME,
  FOREIGN KEY ("template_id") REFERENCES "templates" ("id")
);

CREATE TABLE "assets" (
  "id" VARCHAR(36) PRIMARY KEY,
  "path" TEXT NOT NULL,
  "project_id" VARCHAR(36) NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" DATETIME,
  FOREIGN KEY ("project_id") REFERENCES "projects" ("id")
);

CREATE TABLE "final_asset" (
  "id" VARCHAR(36) PRIMARY KEY,
  "path" TEXT NOT NULL,
  "project_id" VARCHAR(36) NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" DATETIME,
  FOREIGN KEY ("project_id") REFERENCES "projects" ("id")
);

CREATE TABLE "configurators" (
  "id" VARCHAR(36) PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "configurator_schema" TEXT NOT NULL
);

CREATE TABLE "configurator_templates" (
  "configurator_id" VARCHAR(36),
  "template_id" VARCHAR(36),
  FOREIGN KEY ("configurator_id") REFERENCES "configurators" ("id"),
  FOREIGN KEY ("template_id") REFERENCES "templates" ("id")
);
