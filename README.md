#  Iterview Planner

Interview Planner is an AI-powered interview preparation web app. It analyzes a target job description with a user's resume or self-description, then generates a personalized interview plan with match score, technical questions, behavioral questions, skill gaps, and a preparation roadmap.

Build by Mohd Subhan.

## Features

- User registration, login, logout, and protected routes
- Resume upload with job description analysis
- AI-generated interview strategy
- Technical and behavioral interview questions
- Skill-gap analysis with severity labels
- Day-wise preparation roadmap
- Recent interview reports
- AI-generated tailored resume PDF
- Responsive dark theme UI
- Themed loading screens

## Tech Stack

**Frontend**

- React
- Vite
- React Router
- Axios
- Scss

**Backend**

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Cookie-based auth
- Multer for file upload
- Google GenAI
- Puppeteer for PDF generation

## Project Structure

```txt
interview-ai-yt/
  Backend/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
    server.js
    package.json

  Frontend/
    src/
      components/
      features/
        auth/
        interview/
      style/
    vite.config.js
    package.json
```

## Prerequisites

- Node.js
- npm
- MongoDB database
- Google GenAI API key

## Environment Variables

Create a `.env` file inside `Backend/`.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd Frontend
npm install
```

## Run Locally

Start the backend:

```bash
cd Backend
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

The frontend uses Vite proxy for API requests. Calls to `/api` are forwarded to `http://localhost:3000`.

## API Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/logout
GET  /api/auth/get-me
```

### Interview

```txt
POST /api/interview/
GET  /api/interview/
GET  /api/interview/report/:interviewId
POST /api/interview/resume/pdf/:interviewReportId
```

## Build Frontend

```bash
cd Frontend
npm run build
```

## Troubleshooting

If login/API calls fail, make sure:

- Backend is running on `http://localhost:3000`
- Frontend is running on `http://localhost:5173`
- Backend `.env` file has valid values
- MongoDB is connected
- Browser cookies are enabled

If Puppeteer PDF generation fails in some environments, check whether the system allows Chromium to run.

## Author

Mohd Subhan
