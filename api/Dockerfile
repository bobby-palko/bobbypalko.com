# Use a Node.js base image
FROM node:20 as base

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

CMD [  "npm", "run", "dev" ]

FROM base as prod

ENV NODE_PATH=./build

RUN npm run build
