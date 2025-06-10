import { useState } from "react";

// todo
export default function Sidebar({ project, onUpload }: any) {
  const [projectName, setProjectName] = useState(project || "");
  const [error, setError] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("video/mp4")) {
      setError("Only MP4 files are supported.");
      return;
    }
    onUpload(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (projectName.trim() === "") {
      setError("Project name cannot be empty.");
    } else {
      setError("");
      console.log("Saving project:", projectName);
    }
  };

  return (
    <form className="sidebar" onSubmit={handleSubmit}>
      <div className="settings-content">
        <h2>Settings</h2>
        <div className="setting-config-box">
          <header>
            <h4>General</h4>
          </header>
          <div className="content-inner">
            <p>Base settings for this project.</p>
            <label htmlFor="project-name">Project Name:</label>
            <input
              id="project-name"
              name="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
            />
            {error && <div style={{ color: "#ff5555" }}>{error}</div>}
          </div>
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
          <input type="reset" value="Reset changes" className="reset-btn" />
          <input type="submit" value="Save changes" className="save-btn" />
          <input type="button" value="Apply" className="apply-btn" />
        </div>
      </div>
    </form>
  );
}
