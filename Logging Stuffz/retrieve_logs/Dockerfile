# Dockerfile

FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3900
CMD ["node", "./src/retrieve.js"]
