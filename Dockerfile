ARG NODE_VERSION=14-alpine3.10
FROM node:${NODE_VERSION}

LABEL maintainer="gmartin_b@usal.es"

WORKDIR /usr/src/app

# Install PM2
RUN npm install pm2 -g

# Install dependencies
COPY package*.json ./
RUN npm install

# Show the content of the workdir
RUN ls -la -R

# Copy the app
COPY . .

CMD ["pm2-runtime", "src/index.js"]
