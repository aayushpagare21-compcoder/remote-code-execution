FROM node:latest

WORKDIR '/server'

COPY package.json .

COPY yarn.lock . 

RUN yarn install --production

COPY . . 

CMD [ "node", "app.js" ]