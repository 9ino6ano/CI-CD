FROM node:19-alpine
#This is a complete isolated systeme [virtual file system of container]
#COPY <src> on our machine <dest> in the container

COPY package.json /app/
COPY src /app/

#WORKDIR - sets the working directory for all the following commands e.g Like changing into a dir using [cd ...]
WORKDIR /app

RUN npm install

CMD ["node", "server.js"]
#From dockerfile to container
#These commands which will create a docker image for our node.js application
