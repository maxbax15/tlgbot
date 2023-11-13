# Builder container to compile typescript
FROM node:lts-alpine AS prod
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i --production

# Copy the application source
COPY ./dist .

CMD [ "node", "main.js"]
