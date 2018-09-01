FROM node:8.11.4-alpine as base
# Create app directory
WORKDIR /usr/src/app
RUN apk --update --no-cache add curl
ENV HOST 0.0.0.0
EXPOSE 8080

FROM base as dependencies
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# If you are building your code for production
# RUN npm install --only=production
RUN npm set progress=false && \
    npm install --only=production

# Bundle app source
FROM dependencies as develop
RUN rm -rf node_modules/ && npm set progress=false && \
    npm install
COPY . .
RUN npm run build

# This will be our travis build
FROM develop AS test
ARG TRAVIS=""
ARG TRAVIS_JOB_ID=""
ARG TRAVIS_BRANCH="" 
ARG TRAVIS_PULL_REQUEST=""
RUN TRAVIS=${TRAVIS} TRAVIS_JOB_ID=${TRAVIS_JOB_ID} TRAVIS_BRANCH=${TRAVIS_BRANCH} TRAVIS_PULL_REQUEST=${TRAVIS_PULL_REQUEST} COMMIT_LOG=${COMMIT_LOG} /bin/sh -c "/code/scripts/ci-test"

FROM base as release
COPY --from=dependencies /usr/src/app/package.json ./package.json
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=develop /usr/src/app/build ./build/
COPY --from=develop /usr/src/app/.nuxt ./.nuxt/
COPY --from=develop /usr/src/app/nuxt.config.js ./nuxt.config.js


ENTRYPOINT ["npm", "run"]
CMD [ "start" ]
