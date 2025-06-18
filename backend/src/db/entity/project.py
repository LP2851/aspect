from dataclasses import dataclass

from src.db.entity.entity import Entity


@dataclass
class Project(Entity):
    id: str
    project_name: str
    status: str
    template_id: str
    configuration: str
    created_at: str
    updated_at: str
    deleted_at: str | None
