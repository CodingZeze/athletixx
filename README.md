# AthletiX - Sports Statistics & Favorites Platform

A modern, production-ready Next.js 14 application for managing favorite teams and players with real-time sports statistics.

## Features

### User Features
- ✅ User authentication (Sign Up/Login/Logout)
- ✅ Dashboard with personalized favorites
- ✅ Search and add favorite teams
- ✅ Search and add favorite players
- ✅ View favorite teams and players
- ✅ Delete favorites
- ✅ Protected routes (authentication required)

### Admin Features
- ✅ View all users
- ✅ Delete users
- ✅ Protected admin panel
- ✅ Role-based access control

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Prisma ORM with SQLite database
- ✅ NextAuth for authentication
- ✅ Role-based authorization
- ✅ Responsive design
- ✅ Production-ready code

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Password Hashing**: bcryptjs
- **HTTP Client**: axios

## Project Structure

```
athletixx/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.ts
│   │   │   │   └── [...nextauth]/route.ts
│   │   │   ├── favorites/
│   │   │   │   ├── teams/route.ts
│   │   │   │   ├── teams/[id]/route.ts
│   │   │   │   ├── players/route.ts
│   │   │   │   └── players/[id]/route.ts
│   │   │   ├── admin/
│   │   │   │   ├── users/route.ts
│   │   │   │   └── users/[id]/route.ts
│   │   │   └── users/
│   │   │       └── profile/route.ts
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── search/page.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── providers.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── FavoriteTeams.tsx
│   │   ├── FavoritePlayers.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   └── prisma.ts
│   ├── utils/
│   │   └── sports-api.ts
│   └── middleware.ts
├── prisma/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+ or later
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/CodingZeze/athletixx.git
cd athletixx
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
SPORTS_API_KEY="your-sports-api-key-here"
```

To generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Setup database**
```bash
npm run prisma:migrate
```

5. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Authentication

### User Registration
1. Navigate to `/signup`
2. Enter email, name, and password (min 8 characters)
3. Account is created and you're automatically logged in

### User Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"

### Test Admin Account
To create an admin account, modify the signup API or manually update the database:
```sql
UPDATE User SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Favorites (Requires Authentication)
- `GET /api/favorites/teams` - Get user's favorite teams
- `POST /api/favorites/teams` - Add favorite team
- `DELETE /api/favorites/teams/[id]` - Delete favorite team
- `GET /api/favorites/players` - Get user's favorite players
- `POST /api/favorites/players` - Add favorite player
- `DELETE /api/favorites/players/[id]` - Delete favorite player

### User
- `GET /api/users/profile` - Get user profile (Requires Authentication)

### Admin (Requires Admin Role)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/[id]` - Delete user

## Authorization

### User Roles
- **USER**: Standard user account (default role)
- **ADMIN**: Administrator with access to admin panel

### Route Protection
- Public: `/`, `/login`, `/signup`
- Protected: `/dashboard`, `/dashboard/search`, `/api/favorites/*`, `/api/users/*`
- Admin Only: `/admin`, `/api/admin/*`

## Database Schema

See `prisma/schema.prisma` for complete schema.

Key models:
- **User**: Authentication and role management
- **FavoriteTeam**: User's saved teams
- **FavoritePlayer**: User's saved players
- **SearchHistory**: Track user searches

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Generate new `NEXTAUTH_SECRET` for production

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Database for Production

For production, consider migrating from SQLite to:
- PostgreSQL (recommended with Prisma)
- MySQL
- MongoDB

Update `DATABASE_URL` in environment variables and run:
```bash
npm run prisma:migrate
```

## Performance Considerations

- SQLite is suitable for development and small deployments
- For production with many concurrent users, migrate to PostgreSQL
- Implement caching for sports API calls
- Add pagination for large lists
- Consider indexing frequently queried fields

## Security Best Practices

✅ Implemented:
- Password hashing with bcryptjs
- JWT-based session management
- Role-based access control
- Protected API routes
- Middleware for route protection
- CSRF protection via NextAuth

## Known Limitations

- Sports API uses mock data (free tier limitation)
- SQLite has concurrency limitations for production
- No real-time updates (polling can be implemented)

## Future Enhancements

- [ ] Real sports API integration
- [ ] Live notifications
- [ ] Statistics and analytics
- [ ] Team and player ratings
- [ ] Social features (follow, share)
- [ ] Mobile app
- [ ] Email notifications
- [ ] Dark mode

## Support

For issues, feature requests, or contributions, please open an issue on GitHub.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

CodingZeze - [GitHub](https://github.com/CodingZeze)

---

**AthletiX** - Your Ultimate Sports Statistics Platform 🏆
