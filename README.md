Full Stack Blog Platform
A fully functional Medium-like blog platform built using a modern full stack including React, TypeScript, Prisma, Cloudflare Workers, PostgreSQL, and AWS. Features include user authentication, blog creation, editing, viewing, and backend API deployment.

🚀 Tech Stack
🖥️ Frontend
React.js with Vite

Tailwind CSS

React Router DOM

TypeScript

🌐 Backend
Cloudflare Workers (via Hono framework)

Prisma ORM with Accelerate

PostgreSQL (via NeonDB)

JWT Authentication

Zod for input validation

📦 Common (Shared Package)
Zod schemas

Type-safe types shared across frontend and backend

Published as an internal npm package

☁️ Cloud & Deployment
Cloudflare (for backend)

AWS (EC2, S3, CloudFront, Route 53 for frontend)

Monorepo project structure

📂 Project Structure
php
Copy
Edit
medium-clone/
├── backend/       # Cloudflare Worker + Hono + Prisma APIs
├── frontend/      # React + Vite + Tailwind frontend
├── common/        # Shared types and zod schemas
🔐 Features
✅ User Signup & Signin (with JWT auth)

✍️ Create, Edit, and View Blogs

🧾 Public blog access with route-based permissions

🌩️ Serverless backend using Cloudflare Workers

🔁 Type-safe schema validation with Zod

🌍 Deployed on AWS (frontend) and Cloudflare (backend)

🛠️ Getting Started
Prerequisites
Node.js & npm

PostgreSQL (NeonDB or any hosted version)

AWS & Cloudflare accounts

Git

