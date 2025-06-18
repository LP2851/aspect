import { memo, useEffect, useState } from "react";
import { redirect, useParams } from "react-router";
import Sidebar from "../../../components/sidebar/Sidebar.tsx";
import "./ProjectEditorPage.css";
import type { Project } from "../../../api/types/types.ts";
import AspectClient from "../../../api/AspectClient.ts";

const ProjectEditorPage = ({ files = [] }: { files: string[] }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const client = new AspectClient();
    if (!projectId) {
      return;
    }
    client
      .getProject(projectId)
      .then((project) => {
        setProject(project);
      })
      .catch(() => {
        redirect("/");
      });
  }, [projectId]);

  return (
    <>
      <div className="editor-content-wrapper">
        <section style={{ flexGrow: 1 }}>
          <div className="video-grid">
            {files.map((file, index) => (
              <video
                key={index}
                controls
                src={`/uploads/${projectId}/${file}`}
              ></video>
            ))}
          </div>
        </section>
      </div>

      {project && (
        <Sidebar
          project={project}
          setProject={setProject}
          onUpload={() => {}}
        />
      )}
    </>
  );
};

export default memo(ProjectEditorPage);
