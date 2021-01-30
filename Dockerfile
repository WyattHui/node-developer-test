FROM node:15.5.1-alpine
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
EXPOSE 8080
CMD node index.js
COPY package.json /app
RUN npm install
COPY . /app