FROM node:22.13.1-alpine3.20

WORKDIR /story-gen-ai-web

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run" ,"prod"]

EXPOSE 3000