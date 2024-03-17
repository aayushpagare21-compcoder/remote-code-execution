FROM node:latest

WORKDIR '/workers'

COPY package.json .

COPY yarn.lock . 

RUN yarn install

COPY . . 

CMD [ "node", "app.js" ]