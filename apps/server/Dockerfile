# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace configuration files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy the entire workspace structure needed for build
COPY apps/server/package.json ./apps/server/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

COPY . .

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

# Copy built output
COPY --from=builder /app/apps/server/dist ./dist

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json (optional, for reference)
COPY apps/server/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
