## Build in docker
Run docker command for the development environment
```bash
$ CURRENT_UID=$(id -u):$(id -g) docker-compose -f docker-compose.dev.yml up --build
```

## Run in docker
Run docker command
```bash
$ CURRENT_UID=$(id -u):$(id -g) docker-compose -f docker-compose.dev.yml up -d
```

## Enter into the docker container
```bash
$ docker exec -it pichat_backend_1 sh
```

## Use Nest CLI in docker container
### As example, creating a new module
```sh
$ ./nest g module test 
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
