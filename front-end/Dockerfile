FROM node:15.2.0-alpine as builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm ci
ARG REACT_APP_URL
ENV REACT_APP_URL $REACT_APP_URL
COPY . .
CMD ["npm", "start"]
EXPOSE 3000