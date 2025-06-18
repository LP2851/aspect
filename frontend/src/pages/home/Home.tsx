import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Select from "../../components/input/select/Select.tsx";
import TextInput from "../../components/input/text/TextInput.tsx";
import Button from "../../components/button/Button.tsx";
import ErrorMessage from "../../components/error-message/ErrorMessage.tsx";
import AspectClient from "../../api/AspectClient.ts";
import ButtonTypes from "../../components/button/ButtonTypes.ts";
import type {Project} from "../../api/types/types.ts";
import "./Home.css";

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [newProject, setNewProject] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const client = new AspectClient();
    client.getProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!selectedProject && newProject.trim() === "") {
      setError(
        "Please select an existing project or enter a new project name.",
      );
      return;
    }
    const project = newProject || selectedProject;

    if (newProject) {
      const aspectClient = new AspectClient();
      try {
        await aspectClient.createProject(newProject);
      } catch (err) {
        console.log(err);
        setError(
          "Please select an existing project or enter a new project name.",
        );
        return;
      }
    }
    navigate(`/project/${encodeURIComponent(project)}`);
  };

  return (
    <div className="content">
      <h1 className="card-h1">Select or Create a Project</h1>
      <form>
        <Select
          id="project-select"
          label="Choose an existing project:"
          value={selectedProject}
          onChange={(e: any) => {
            setSelectedProject(e.target.value);
            setNewProject("");
            setError("");
          }}
          options={projects.map((project: Project) => {
            return { value: project.id, label: project.project_name }})}
          defaultOption="-- Select project --"
        />
        <TextInput
          id="new-project"
          autocomplete={false}
          label="Or create a new project:"
          value={newProject}
          placeholder="Enter new project name"
          onChange={(e) => {
            setNewProject(e.target.value);
            setSelectedProject("");
            setError("");
          }}
        />

        <ErrorMessage message={error} />

        <div className="btn-wrapper">
          <Button
            value="Go"
            type={ButtonTypes.PRIMARY}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default memo(Home);
