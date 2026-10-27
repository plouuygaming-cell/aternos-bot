FROM openjdk:17-slim
RUN apt-get update && apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
