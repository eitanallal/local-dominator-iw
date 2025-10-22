FROM node:22-alpine AS base

WORKDIR /app

# Copy root package files and install dependencies
COPY package*.json ./


# Rebuild the entire project if something in the monorepo changes
RUN npm install

# Copy the rest of the monorepo source
COPY . .

# Build the server app
RUN nx build server

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "main.js"]
