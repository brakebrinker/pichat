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

## Migrations
```bash
# Generate migration
$ yarn run generate-migration migration-name
```

```bash
# Create migration
$ yarn run create-migration new-migration-name
```

```bash
# Run migrations
$ yarn run run-migrations
```

```bash
# Revert migrations
$ yarn run revert-migrations
```


## Elasticsearch
You have to change host IP in ./config/hosts file for your own es01 docker container.
### Common issues
You might run into an issue when doing the above: es01 exited with code 78. There is a high chance that increasing the  vm.max_map_count will help
```bash
# Just run this command
$ sudo sysctl -w vm.max_map_count=262144
```
