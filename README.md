# AI Mock Interview Platform

## Overview

An AI-powered mock interview platform that helps professionals prepare for job interviews through realistic simulations and instant AI-generated feedback.

## Tech Stack

- **Frontend**: Next.js 14
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle
- **AI Integration**: Google Gemini API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Features

- AI-generated interview questions
- Instant performance feedback
- Multiple industry interview simulations
- Personalized rating and improvement suggestions

## Prerequisites

- Node.js 18+
- Clerk Account
- Neon Database
- Google Gemini API Key

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/bobbyy16/Interview-AI.git
cd Interview-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local`:

```
Refer .env.example
```

### 4. Run Migrations

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

## Database Schema

- **Users**: Authentication and profile details
- **Interviews**: Mock interview records
- **UserAnswers**: Individual question responses and feedback

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## License

MIT License

## Contact

Abhishek k - bobbyyyyy16@gmail.com
