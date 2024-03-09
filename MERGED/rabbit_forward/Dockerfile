# Dockerfile

FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3200
CMD ["node", "./src/send.js"]
