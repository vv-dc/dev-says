FROM node:15.11.0-alpine3.10
ENV HOST=0.0.0.0
ENV PORT=8080
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "src/index.js"]