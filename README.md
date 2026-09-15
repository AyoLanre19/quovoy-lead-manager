# Quovoy Lead Manager

A full-stack Lead Manager application built for the Quovoy Fullstack Developer assessment.

## Overview

Quovoy Lead Manager allows users to create and view sales leads through a simple web interface backed by a REST API and PostgreSQL.

## Features

* Create new leads
* View all leads
* Manage lead status
* Email uniqueness validation
* Request validation
* PostgreSQL persistence
* REST API
* Responsive frontend
* Production deployment

## Lead Fields

Each lead contains:

* `name` — required string
* `email` — required unique email
* `status` — one of:

  * `NEW`
  * `ENGAGED`
  * `PROPOSAL_SENT`
  * `CLOSED_WON`
  * `CLOSED_LOST`
* `createdAt` — automatically generated timestamp

## API Endpoints

### Health Check

`GET /health`

### Get All Leads

`GET /leads`

### Create Lead

`POST /leads`

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "NEW"
}
```

## Running Locally

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Backend runs on:

`http://localhost:5000`

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

`http://localhost:3000`

## Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Do not commit environment files or database credentials.

## Deployment

The backend is deployed on Render and uses PostgreSQL.

Backend:

https://quovoy-lead-manager.onrender.com

The frontend can be run locally using the instructions above.

## Project Structure

```text
quovoy-lead-manager/
├── backend/
│   ├── prisma/
│   └── src/
├── frontend/
│   ├── src/
│   └── public/
├── .gitignore
└── README.md
```
