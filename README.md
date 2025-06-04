# aspect
Interface for creating and running ffmpeg filters

## Getting Started
### Dependencies
- [Python](https://www.python.org/) - v3.12 or later
- [Poetry](https://python-poetry.org/)
- [nmap](https://nmap.org/)

### Running the application
Install the dependencies by executing the following command:
```shell
poetry install
```

Run with the command:
```shell
poetry run python src/aspect.py
```


## Developing
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

## License
This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details
