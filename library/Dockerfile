FROM node:18.18-alpine

#RUN apt-get -y update && apt-get install -y fortunes

WORKDIR /app

ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}

COPY ./package*.json ./
RUN npm install

COPY ./ ./

#EXPOSE 3000

CMD ["npm", "run", "server"]