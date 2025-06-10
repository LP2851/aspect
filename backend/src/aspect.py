import os
import webbrowser

from flask import request, render_template, send_from_directory, Flask, redirect, url_for

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home() -> str:
    # TODO REMOVE OLD
    """
    Home page: Show existing projects and allow creation of new projects.
    """
    projects = [
        d for d in os.listdir(app.config["UPLOAD_FOLDER"])
        if os.path.isdir(os.path.join(app.config["UPLOAD_FOLDER"], d))
    ]
    return render_template("templates/index.html", projects=projects)


@app.route("/projects")
def projects():
    """
    # Home page: Show existing projects and allow creation of new projects.
    """
    projects = [
        d for d in os.listdir(app.config["UPLOAD_FOLDER"])
        if os.path.isdir(os.path.join(app.config["UPLOAD_FOLDER"], d))
    ]
    return { "projects": projects }


@app.route("/upload", methods=["GET"])
def go_to_project():
    # TODO REMOVE OLD
    """
    Redirect to the project upload page based on selection or new name.
    """
    project = request.args.get("project")
    new_project = request.args.get("new_project", "").strip().replace(" ", "_")

    project_name = new_project if new_project else project
    if not project_name:
        return redirect(url_for("home"))  # fallback

    return redirect(url_for("project_upload", project_name=project_name))


@app.route("/uploads/<project_name>/<filename>")
def uploaded_file(project_name: str, filename: str):
    # TODO REMOVE OLD
    """
    Serve a file from a specific project directory.
    """
    return send_from_directory(os.path.join(app.config["UPLOAD_FOLDER"], project_name), filename)


@app.route("/projects/<project_name>")
def project_upload(project_name: str):
    # TODO REMOVE OLD
    """
    Display the upload page for a specific project.
    """
    project_path = os.path.join(app.config["UPLOAD_FOLDER"], project_name)
    os.makedirs(project_path, exist_ok=True)
    files = [
        f for f in os.listdir(project_path)
        if f.endswith(".mp4")
    ]
    return render_template("templates/upload.html", files=files, project=project_name)

@app.route("/upload/<project_name>", methods=["POST"])
def upload_file(project_name: str):
    # TODO REMOVE OLD
    """
    Upload an MP4 file to a specific project's folder.
    """
    file = request.files.get("file")
    if not file or not file.filename.endswith(".mp4"):
        return "Invalid file type", 400

    filename = file.filename.replace(" ", "_")
    project_path = os.path.join(app.config["UPLOAD_FOLDER"], project_name)
    os.makedirs(project_path, exist_ok=True)

    filepath = os.path.join(project_path, filename)
    file.save(filepath)

    return f"Uploaded: {filename}", 200


if __name__ == "__main__":
    webbrowser.open_new("http://127.0.0.1:5000")
    app.run()
