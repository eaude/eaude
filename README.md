# eaude

> website for eaude

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).

## Docker

We use docker to run our containers, and the docker-compose file looks for a .env file with the following variables

```bash
  touch .env 
```
and then paste the following variables inside the file
```
cache_ttl=
TUMBLR_CONSUMER_KEY=
REDIS_HOST=redis
DATABASE_URL=
SESSION_SECRET=
SESSION_KEY=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

Assuming you have the latest version of docker installed, we use compose to manage all development code.
The Dockerfile is a multi-stage build, and docker-compose targets the development stage. 

The stage that we want to host on docker-cloud is the 'release' stage. This pushes the image withonly the build code inside of the image. 

``` bash
  $ docker-compose up app
```

To test the app in production

## Travis

... TODO

## S3

All images are uploaded to an s3 bucket through the client using the AWS-SDK.

## TODOS
  - create lamda function to resize and blur images at url request level & integrate with cloudfront
  - seperate app server and api server into seperate containers
  - build more robust admin panel and give the user CRUD functioality
  - test test test