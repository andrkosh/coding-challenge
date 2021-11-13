FROM alekzonder/puppeteer:latest

user root

workdir /usr/src/app

copy package*.json ./

RUN npm i -g @nestjs/cli
run npm install

copy . .

cmd ["npm", "run", "dev"]

