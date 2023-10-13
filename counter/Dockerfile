FROM node:18.18-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY ./package*.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "run", "server"]