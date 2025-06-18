import axios, { type AxiosInstance } from "axios";
import type {Project} from "./types/types.ts";

export default class AspectClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    });
  }

  public async getProjects() {
    const response = await this.client.get("/projects");
    console.log(response);
    return response.data?.projects as Project[];
  }

  public async getProject(projectId: string) {
    const response = await this.client.get(`/projects/${projectId}`);
    console.log(response);
    return response.data as Project;
  }

  public async createProject(projectName: string) {
    return await this.client.post("/projects", { projectName }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
