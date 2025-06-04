import os
import webbrowser

from flask import request, render_template, send_from_directory, Response, Flask

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def index() -> str:
    """
    Handles the root URL endpoint to render the upload.html template with a list
    of uploaded .mp4 files.

    :returns: Rendered HTML template with a list of `.mp4` files.
    :rtype: str
    """
    files = [f for f in os.listdir(app.config["UPLOAD_FOLDER"]) if f.endswith(".mp4")]
    return render_template("upload.html", files=files)


@app.route("/upload/<filename>")
def uploaded_file(filename: str) -> Response:
    """
    Handles the request to serve a file that has been uploaded to the server.

    :param filename: The name of the file to be served.
    :type filename: str
    :return: The requested file from the upload folder.
    :rtype: Response
    """
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/upload", methods=["POST"])
def upload_file() -> tuple[str, int]:
    """
    Handles the upload of a file via a POST request. The method ensures the file is of
    a valid type (mp4) and saves it to the configured upload folder.

    :return: A tuple containing a message about the file upload status and the associated HTTP
        status code:
        - "Uploaded: {file.filename}", 200 if the file upload succeeded.
        - "Invalid file type", 400 if the file is not an mp4 file.
    :rtype: tuple
    """
    file = request.files.get("file")
    file.filename = file.filename.replace(" ", "_")
    if file and file.filename.endswith(".mp4"):
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filepath)
        return f"Uploaded: {file.filename}", 200
    return "Invalid file type", 400


if __name__ == "__main__":
    webbrowser.open_new("http://127.0.0.1:5000")
    app.run()
