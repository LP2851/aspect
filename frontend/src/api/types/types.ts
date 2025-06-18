export interface Template {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Project {
  id: string;
  project_name: string;
  status: string;
  template_id: string;
  configuration: string;

  created_at: string;
  updated_at: string;
  deleted_at?: string;

  template?: Template;
}
