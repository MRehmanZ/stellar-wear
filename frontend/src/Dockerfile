# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the React app
COPY . .
RUN npm run build

# Install serve to serve the build files
RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "build"]
