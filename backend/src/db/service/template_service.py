from src.db.entity.template import Template
from src.db.service.entity_service import EntityService


class TemplateService(EntityService):
    def __init__(self):
        super().__init__("templates", Template)

    def create(self, entity: Template) -> None:
        super().create(entity)

    def find(self, _id: str) -> Template | None:
        return super().find(_id)

    def find_all(self) -> list[Template]:
        return super().find_all()

    def update(self, entity: Template) -> Template | None:
        return super().update(entity)
