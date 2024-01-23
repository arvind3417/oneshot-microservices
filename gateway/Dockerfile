# FROM node:14.8.0-alpine
# RUN npm install -g npm@6.14.7
# RUN mkdir -p /var/www/gateway
# WORKDIR /var/www/gateway
# ADD . /var/www/gateway
# RUN npm install
# CMD npm run start:dev

FROM node:alpine
WORKDIR /usr/src/gateway
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
CMD [ "node","dist/main.js" ]