# syntax=docker/dockerfile:1

FROM node:18.12-slim
EXPOSE 5000
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
COPY . .
RUN npm run build

# start app
CMD ["npm", "run", "start"]
