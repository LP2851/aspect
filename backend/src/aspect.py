import os

from flask import request, Flask, jsonify
from flask_cors import CORS

from src.db.db_connector import DatabaseConnector
from src.db.service.project_service import ProjectService
from src.db.service.template_service import TemplateService

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def get_projects():
    project_service = ProjectService()
    rows = project_service.find_all()
    return rows


def create_new_project(project_name: str):
    # todo create new project

    project_path = os.path.join(app.config["UPLOAD_FOLDER"], project_name)
    os.makedirs(project_path, exist_ok=True)


@app.route("/projects")
def projects():
    return {"projects": get_projects()}


@app.route("/projects/<project_id>")
def get_project(project_id: str):
    project_service = ProjectService()
    project = project_service.find(project_id)
    if project is None:
        return {"message": f"Not found: Project '{project_id}'"}, 404
    project_dict = project.to_dict()
    project_dict["template"] = TemplateService().find(project.template_id).to_dict()
    print(project_dict)
    return project_dict


@app.route("/projects", methods=["POST"])
def create_new_project_route():
    data = request.get_json()
    if not data or "projectName" not in data:
        return jsonify({"error": "Missing 'projectName' in request body"}), 400

    project_name = data["projectName"].strip()

    if not project_name:
        return jsonify({"projectName": "Project name cannot be empty"}), 400

    current_projects = get_projects()
    if project_name in current_projects:
        return jsonify({"projectName": "Project name is already in use"}), 400

    create_new_project(project_name)

    return jsonify({"message": "Project created successfully", "project": project_name}), 201


# @app.route("/upload", methods=["GET"])
# def go_to_project():
#     # TODO REMOVE OLD
#     """
#     Redirect to the project upload page based on selection or new name.
#     """
#     project = request.args.get("project")
#     new_project = request.args.get("new_project", "").strip().replace(" ", "_")
#
#     project_name = new_project if new_project else project
#     if not project_name:
#         return redirect(url_for("home"))  # fallback
#
#     return redirect(url_for("project_upload", project_name=project_name))


# @app.route("/uploads/<project_name>/<filename>")
# def uploaded_file(project_name: str, filename: str):
#     # TODO REMOVE OLD
#     """
#     Serve a file from a specific project directory.
#     """
#     return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], project_name), filename)


# @app.route("/projects/<project_name>")
# def project_upload(project_name: str):
#     # TODO REMOVE OLD
#     """
#     Display the upload page for a specific project.
#     """
#     project_path = os.path.join(app.config["UPLOAD_FOLDER"], project_name)
#     os.makedirs(project_path, exist_ok=True)
#     files = [
#         f for f in os.listdir(project_path)
#         if f.endswith(".mp4")
#     ]
#     return render_template("templates/upload.html", files=files, project=project_name)


# @app.route("/upload/<project_name>", methods=["POST"])
# def upload_file(project_name: str):
#     # TODO REMOVE OLD
#     """
#     Upload an MP4 file to a specific project's folder.
#     """
#     file = request.files.get("file")
#     if not file or not file.filename.endswith(".mp4"):
#         return "Invalid file type", 400
#
#     filename = file.filename.replace(" ", "_")
#     project_path = os.path.join(app.config["UPLOAD_FOLDER"], project_name)
#     os.makedirs(project_path, exist_ok=True)
#
#     filepath = os.path.join(project_path, filename)
#     file.save(filepath)
#
#     return f"Uploaded: {filename}", 200


if __name__ == "__main__":
    app.run(port=5001)
