# VTC Backend

Express.js backend with TypeScript and Prisma ORM for the VTC agency website.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Edit `.env` file with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/vtc_db?schema=public"
PORT=5000
```

### 3. Run Prisma Migrations
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact requests

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects

## Project Structure
```
src/
├── controllers/     # Request handlers
├── routes/          # API routes
└── server.ts        # Main server file
```
