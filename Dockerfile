FROM node:20
RUN apt-get update && apt-get install -y openjdk-21-jre-headless
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]