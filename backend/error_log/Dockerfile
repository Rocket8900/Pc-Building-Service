# Dockerfile

FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]