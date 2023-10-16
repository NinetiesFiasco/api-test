FROM node:18-alpine
WORKDIR /app/api-test
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3502
CMD ["npm", "dev"]