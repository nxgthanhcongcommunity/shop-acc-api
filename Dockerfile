# Use the official Node.js 16 image from the Docker Hub
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the app directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 4003

# Define the command to run the app
CMD ["npm", "start"]
