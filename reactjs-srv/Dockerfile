# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package*.json ./

# Install the dependencies and make the folder
RUN npm install

RUN npm audit fix

RUN mkdir /react-ui \
    && mv ./node_modules ./react-ui \
    && mv package*.json ./react-ui

WORKDIR /react-ui

COPY bin .

# Build the project and copy the files
RUN npm start


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /react-ui/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]