FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "run", "dev"]
