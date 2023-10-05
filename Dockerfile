# Use an official Node.js runtime as a parent image
FROM node:20.8.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
