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

FROM base as dev

CMD [ "npm", "run", "dev" ]

# FROM base as prod

# RUN npm run build

# RUN rm -rf src/ static/

# CMD [ "node", "build/index.js" ]
