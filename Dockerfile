FROM node:18-alpine
WORKDIR /app/api-test
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3502
CMD ["npm", "run", "dev"]