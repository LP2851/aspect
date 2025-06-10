import os
import io
import pytest
from aspect import app, UPLOAD_FOLDER


@pytest.fixture(autouse=True)
def setup_and_teardown():
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    for f in os.listdir(UPLOAD_FOLDER):
        os.remove(os.path.join(UPLOAD_FOLDER, f))

    yield

    for f in os.listdir(UPLOAD_FOLDER):
        os.remove(os.path.join(UPLOAD_FOLDER, f))


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()


def test_index_route_shows_mp4_files(client):
    filepath = os.path.join(UPLOAD_FOLDER, "test.mp4")
    with open(filepath, "wb") as f:
        f.write(b"dummy")

    response = client.get("/")
    assert response.status_code == 200
    assert b"test.mp4" in response.data


def test_upload_file_success(client):
    data = {"file": (io.BytesIO(b"mp4 data"), "video.mp4")}
    response = client.post("/upload", content_type="multipart/form-data", data=data)
    assert response.status_code == 200
    assert b"Uploaded: video.mp4" in response.data
    assert os.path.exists(os.path.join(UPLOAD_FOLDER, "video.mp4"))


def test_upload_file_invalid_type(client):
    data = {"file": (io.BytesIO(b"not a video"), "file.txt")}
    response = client.post("/upload", content_type="multipart/form-data", data=data)
    assert response.status_code == 400
    assert b"Invalid file type" in response.data
