# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace configuration files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy the entire workspace structure needed for build
COPY apps/client/package.json ./apps/client/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

COPY . .

RUN npx nx build client 

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built files to nginx
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]