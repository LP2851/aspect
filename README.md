# <span class="title-gradient">aspect</span>
Interface for creating and running ffmpeg filters

---
## Getting Started
### Dependencies
- [Python](https://www.python.org/) version 3.12 or later
- [Poetry](https://python-poetry.org/)
- [ffmpeg](https://ffmpeg.org/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---
## Developing the Backend
The API is a [Flask](https://flask.palletsprojects.com/) application.
### Running the application
Install the dependencies by executing the following command:
```shell
cd backend
poetry install
```

Run with the command:
```shell
poetry run python src/aspect.py
```
### Running the tests
We use [pytest](https://docs.pytest.org/en/stable/) for testing. You can run the tests by executing the following command:
```
poetry run pytest
```

### Code style
We use [Pylint](https://pypi.org/project/pylint/) for linting and [Black](https://github.com/psf/black) for code formatting.

In this repository, the minimum linting score is 9/10. To run pylint, execute the following command:
```shell
poetry run pylint .
```

To run Black, execute the following command:
```shell
poetry run black .
```

---

## Developing the Frontend
The frontend of the application is a [React](https://react.dev/) application.

### Running the application
Make sure you are using the correct version of Node.js by running the command:
```shell
nvm use
```

Install the dependencies by executing the following command
```shell
cd frontend
npm install
```

Run the dev instance with the command:
```shell
npm run dev
```
### Running the tests
TODO add jest and playwright

### Code style
We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting

To run ESLint, execute the following command:
```shell
npm run lint
```

To run Prettier, execute the following command:
```shell
npm run lint:fix
```

## License
This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details


<link href="https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC&display=swap" rel="stylesheet" />

<style>
    .title-gradient {
        background: linear-gradient(90deg, #6a5acd, #8a2be2, #730bbf);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        display: inline-block;
        font-family: "WDXL Lubrifont TC", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: xxx-large;
        margin: 0;
    }
</style>
