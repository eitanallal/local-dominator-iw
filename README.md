Nx Monorepo: React Client + NestJS Server
This repository contains a full-stack application built with Nx. It includes a React Vite frontend, a NestJS backend, and a PostgreSQL database, all orchestrated via Docker Compose. The setup supports multiple backend and frontend instances with NGINX load balancing.
Setup Instructions
Prerequisites:

- Docker & Docker Compose installed
- Node.js >= 22 (for local development)
- Nx CLI (optional, can use npx nx)

Clone the repository:
git clone <repo-url>
cd <repo-root>

Install dependencies (optional):
npm install

Build and run with Docker Compose:
docker-compose up --build

Access the application:

- Frontend: http://localhost:8080 and http://localhost:8081
- Backend API via NGINX: http://localhost:3000
- Database: postgres://postgres:postgres@localhost:5432/mydb
  API List
  Method Path Description
  GET /api/health Health check
  GET /api/users List all users
  POST /api/users Create a new user
  GET /api/users/:id Get user by ID
  PUT /api/users/:id Update user by ID
  DELETE /api/users/:id Delete user by ID
  Architecture
  Monorepo structure (Nx):
  apps/
  server/ # NestJS API
  client/ # React Vite frontend
  libs/ # Shared code, types, utilities

Dockerized setup diagram:
Tradeoffs
Pros:

- Multiple backend/frontend instances improve availability and scaling.
- NGINX load balancer provides a single API endpoint for the frontend.
- Nx monorepo simplifies sharing code between apps.
- Dockerization ensures reproducible environments.

Cons:

- Increased complexity: multiple containers to manage.
- Local development may require multiple ports.

  Commands Reference
  Build & run all services:
  docker-compose up --build

Run only backend servers:
docker-compose up --build server1 server2

Run only frontend:
docker-compose up --build react1 react2

Stop all services:
docker-compose down
Notes

- Frontend calls backend API via http://api_lb (inside Docker network)
- For production, consider HTTPS termination at NGINX
- Add environment variables for DB credentials, API URLs, etc.
- Docker volumes persist the database between restarts.
