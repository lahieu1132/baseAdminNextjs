# Install dependencies only when needed
FROM node:16-alpine

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
USER node
RUN yarn

COPY --chown=node:node . .

EXPOSE 3000
RUN yarn build
CMD [ "yarn", "start" ]
