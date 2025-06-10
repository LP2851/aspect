import axios, { type AxiosInstance } from "axios";

export default class AspectClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    });
  }

  public async getProjects() {
    const response = await this.client.get("/projects");
    return response.data?.projects as string[];
  }

  public async createProject(name: string) {
    await this.client.post("/projects", { name });
  }
}
