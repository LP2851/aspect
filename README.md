# aspect
Interface for creating and running ffmpeg filters

---
## Getting Started
### Dependencies
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [ffmpeg](https://ffmpeg.org/) - may remove
- [docker](https://www.docker.com/)

---

## Developing the Backend
The backend of the application is a [KeystoneJS](https://keystonejs.com/) application.

### Running the application
Make sure you are using the correct version of Node.js by running the command:
```shell
nvm use
```

Install the dependencies by executing the following command
```shell
cd backend
npm install
```

Create and run the docker container for your database:
```shell
docker-compose up -d postgres
# to stop the container
docker-compose down
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

### Generating GraphQL with Codegen
We use [GraphQL Codegen](https://the-guild.dev/graphql/codegen) for generating GraphQL types and queries for the frontend. 
To generate this file, make sure you have the backend running and then run the following command:
```shell
npm run graphql
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
