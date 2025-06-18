from dataclasses import dataclass

from src.db.entity.entity import Entity


@dataclass
class Template(Entity):
    id: str
    name: str
    description: str
    created_at: str
    updated_at: str
    deleted_at: str | None
