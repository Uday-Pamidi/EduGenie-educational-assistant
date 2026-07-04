# EduGenie - AI-Powered Learning Assistant

EduGenie is a lightweight, AI-powered educational assistant designed to simplify and enhance the learning experience through the power of Generative AI. Built for students, self-learners, and educators.

## Features

### 5 Core Learning Modules

1. **Ask Questions** - Get instant, intelligent answers to your educational questions with AI-powered responses
2. **Concept Explanations** - Deep dive into concepts with clear, structured explanations including examples and common misconceptions
3. **Quiz Generator** - Generate AI-powered quizzes at different difficulty levels to test your knowledge
4. **Summarization** - Summarize and condense learning materials efficiently with key takeaways
5. **Learning Paths** - Get personalized learning recommendations and structured curriculum guidance

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Markdown**: react-markdown

### Backend
- **Runtime**: Node.js
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth
- **AI**: Google Gemini 1.5 Pro (via AI SDK)

### Infrastructure
- **Deployment**: Vercel
- **Real-time**: Server Actions

## Project Structure

```
edugenie/
├── app/
│   ├── api/auth/[...all]/         # Better Auth handlers
│   ├── modules/                    # Learning module pages
│   ├── sign-in/                    # Authentication
│   ├── sign-up/
│   ├── page.tsx                    # Dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── modules/                    # Module components
│   ├── dashboard.tsx               # Main dashboard
│   ├── auth-form.tsx               # Shared auth form
│   ├── skeleton.tsx                # Loading states
│   ├── responsive-container.tsx    # Layout utilities
│   └── ui/                         # shadcn components
├── lib/
│   ├── auth.ts                     # Better Auth config
│   ├── auth-client.ts              # Client auth
│   ├── db/
│   │   ├── index.ts                # Drizzle setup
│   │   └── schema.ts               # Database schema
├── app/
│   └── actions/
│       └── ai-modules.ts           # Server actions
└── package.json
```

## Database Schema

### Better Auth Tables
- `user` - User accounts
- `session` - Session management
- `account` - OAuth/provider accounts
- `verification` - Email verification

### Application Tables
- `learning_histories` - Track user interactions with modules
- `quizzes` - Store generated quizzes and responses
- `learning_paths` - Personalized curriculum
- `user_preferences` - User settings and customization

## Getting Started

### Prerequisites
- Node.js 18+
- Neon PostgreSQL account
- Google Generative AI API key

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# AI
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key
```

Generate `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

Get `GOOGLE_GENERATIVE_AI_API_KEY` from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000`

## Usage Flow

1. **Sign Up/Sign In** - Create account or log in with email
2. **Dashboard** - Access 5 learning modules
3. **Select Module** - Choose the type of learning you need
4. **Interact** - Ask questions, generate quizzes, get explanations
5. **Track Progress** - View learning history and completed paths

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session

### Server Actions (Client-side)
- `answerQuestion(topic, question)` - Get AI answer
- `explainConcept(topic, concept)` - Explain a concept
- `generateQuiz(topic, difficulty)` - Create quiz
- `summarizeText(topic, content)` - Summarize content
- `generateLearningPath(subject, level)` - Get learning path
- `getLearningHistory()` - View past interactions
- `getUserQuizzes()` - View quiz history

## Security

- **Authentication**: Better Auth with secure session management
- **Database**: All user data scoped by userId
- **Password**: Encrypted with bcrypt
- **Cookies**: Secure, HttpOnly cookies with CSRF protection
- **API**: Server-side validation on all endpoints

## Performance

- Streaming responses for real-time AI output
- Optimized database queries with Drizzle ORM
- Client-side caching with React
- Image optimization with Next.js
- Code splitting and lazy loading

## Deployment

### Deploy to Vercel

```bash
# Connect repository
vercel git connect

# Set environment variables in Vercel dashboard
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
vercel env add GOOGLE_GENERATIVE_AI_API_KEY

# Deploy
vercel deploy --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check documentation at `/docs`
- Contact support via email

## Roadmap

- [ ] Voice input for questions
- [ ] Collaborative learning sessions
- [ ] Mobile app
- [ ] Offline mode
- [ ] Custom LLM integration
- [ ] Progress analytics dashboard
- [ ] Study group features
- [ ] Certificate generation

> **Note:** Authentication pages are included in the source code using Better Auth, but authentication is currently disabled for development purposes. Users can directly access the application features and API's keys functions are currently disabled due to website is not recognising it.

## Built By

Created with Next.js, Neon, Better Auth, and Google Gemini AI.

Enjoy learning with EduGenie!
