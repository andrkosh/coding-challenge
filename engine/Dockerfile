FROM node:11.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "dev"]
