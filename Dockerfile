FROM node:8

WORKDIR /usr/src/token-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 14101

CMD [ "npm" , "start" ]

