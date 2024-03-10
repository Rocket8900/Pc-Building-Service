# Use an official Node.js runtime as the base image
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE  3400
CMD ["node", "src/payment.js"]
