from src.db.entity.project import Project
from src.db.service.entity_service import EntityService


class ProjectService(EntityService):
    def __init__(self):
        super().__init__("projects", Project)

    def create(self, entity: Project) -> None:
        super().create(entity)

    def find(self, _id: str) -> Project | None:
        return super().find(_id)

    def find_all(self) -> list[Project]:
        return super().find_all()

    def update(self, entity: Project) -> Project | None:
        return super().update(entity)
