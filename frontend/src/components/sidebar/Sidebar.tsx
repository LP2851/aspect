import { memo, useState, useRef, useEffect } from "react";
import Button from "../button/Button";
import ButtonTypes from "../button/ButtonTypes";
import ConfigBox from "../config-box/ConfigBox";
import TextInput from "../input/text/TextInput";
import type {Project} from "../../api/types/types.ts";
import "./Sidebar.css";

const Sidebar = ({
                   project,
                   setProject,
                   onUpload,
                 }: {
  project: Project;
  setProject: (project: Project) => void;
  onUpload: (file: File) => void;
}) => {
  const [error, setError] = useState("");

  const sidebarRef = useRef<HTMLFormElement>(null);
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing.current && sidebarRef.current) {
      const newWidth = window.innerWidth - e.clientX;
      sidebarRef.current.style.width = `${Math.min(Math.max(newWidth, 200), 600)}px`;
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("video/mp4")) {
      setError("Only MP4 files are supported.");
      return;
    }
    onUpload(file);
  };

  const setProjectName = (projectName: string) => {
    setProject({ ...project, project_name: projectName } as Project);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (project.project_name.trim() === "") {
      setError("Project name cannot be empty.");
    } else {
      setError("");
      console.log("Saving project:", project);
    }
  };

  return (
    <div className="sidebar-wrapper">
      <div className="resizer" onMouseDown={startResizing} />
      <form className="sidebar" onSubmit={handleSubmit} ref={sidebarRef}>
        <div className="settings-scroll-container">
          <div className="settings-content">
            <h2>Configuration</h2>
            <ConfigBox name="General" description="Base settings for this project.">
              <TextInput
                id="project-name"
                value={project.project_name}
                label="Project Name:"
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                autocomplete={false}
              />
              {error && <div style={{ color: "#ff5555" }}>{error}</div>}

              <TextInput
                id="template"
                value={project.template?.name}
                label="Template:"
                placeholder="Template"
                autocomplete={false}
                disabled={true}
              />

            </ConfigBox>
          </div>
        </div>

        <div className="upload-wrapper">
          <label className="upload-zone" htmlFor="fileInput">
            Click or drag an MP4 file here to upload
          </label>
          <input
            id="fileInput"
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
          />
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button value="Reset changes" type={ButtonTypes.DANGER} onClick={() => window.location.reload()} />
            <Button value="Save changes" type={ButtonTypes.SECONDARY} onClick={handleSubmit} />
            <Button value="Apply" type={ButtonTypes.PRIMARY} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(Sidebar);
