# Dynamic Blog with SQLite Database

A modern, full-featured blog built with Next.js 15, TypeScript, and SQLite. Features a secure admin interface for content management.

## ✨ Features

- 🎨 **Modern UI** - Built with Next.js 15, React, and Tailwind CSS
- 🗄️ **SQLite Database** - Lightweight, file-based database for dynamic content
- 🔐 **Secure Admin Panel** - JWT-based authentication with protected routes
- 📝 **Content Management** - Create, edit, and delete posts through web interface
- 🏷️ **Categories & Tags** - Organize content with categories
- ⚙️ **Site Configuration** - Update site settings without touching code
- 📱 **Responsive Design** - Works beautifully on all devices
- 🌙 **Dark Mode Support** - Built-in dark mode
- 📧 **Newsletter** - Email subscription system
- 🚀 **Server Components** - Fast page loads with Next.js App Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Install dependencies:**

```bash
npm install better-sqlite3 @types/better-sqlite3 tsx jose
```

2. **Initialize the database:**

```bash
npm run db:setup
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Visit your blog:**

Open [http://localhost:3000](http://localhost:3000)

5. **Access the admin panel:**

- Click "Admin" link in the footer
- Or go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Default credentials: `admin` / `admin123`

## 📚 Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Complete installation guide
- **[DATABASE_SETUP.md](DATABASE_SETUP.md)** - Database schema and management
- **[ADMIN_SETUP.md](ADMIN_SETUP.md)** - Admin interface and security guide

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (see `env.example`):

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-random-secret-key
NODE_ENV=development
```

**⚠️ Important:** Change default credentials in production!

### Site Configuration

Update site settings through the admin panel:
- Site title and description
- Author information
- Contact email
- Social media links

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── posts/        # Post management
│   │   ├── categories/   # Category management
│   │   ├── config/       # Site configuration
│   │   └── newsletter/   # Newsletter subscription
│   ├── admin/            # Admin interface
│   │   ├── login/        # Login page
│   │   └── page.tsx      # Admin dashboard
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── ClientWrapper.tsx
│   └── NavMenu.tsx
├── lib/
│   ├── db.ts            # Database connection
│   ├── db-queries.ts    # Database queries
│   ├── auth.ts          # Authentication utilities
│   ├── schema.sql       # Database schema
│   └── init-db.ts       # Database initialization
└── blog.db              # SQLite database (created on setup)
```

## 🎯 Admin Features

### Dashboard Tabs

1. **Posts** - View and manage all posts
2. **New Post** - Create new blog posts
3. **Categories** - Manage post categories
4. **Site Config** - Update site-wide settings

### Post Management

- Create posts with Markdown support
- Set publish status and featured flag
- Organize with categories
- Add reading time estimates
- SEO-friendly slugs

## 🔒 Security

- JWT-based authentication with HTTP-only cookies
- 24-hour session expiration
- Protected admin routes
- Environment-based credentials
- HTTPS enforcement in production

## 🗄️ Database Schema

### Tables

- **site_config** - Site-wide configuration
- **posts** - Blog posts with full content
- **categories** - Post categories
- **tags** - Post tags
- **post_tags** - Post-tag relationships
- **social_links** - Social media links
- **newsletter_subscribers** - Email subscribers

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:setup     # Initialize and seed database
npm run db:reset     # Reset database with fresh data
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in dashboard
4. Deploy!

### Other Platforms

Works with any platform supporting Next.js:
- Netlify
- Railway
- Render
- Self-hosted

**Note:** Ensure SQLite database persistence with volume mounts or use a different database in production.

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Database:** SQLite (better-sqlite3)
- **Authentication:** JWT (jose)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## 📦 Key Dependencies

- `next` - React framework
- `react` - UI library
- `better-sqlite3` - SQLite database
- `jose` - JWT authentication
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `@radix-ui/*` - UI primitives

## 🔄 Workflow

1. **Content Creation**
   - Log in to admin panel
   - Create posts with Markdown
   - Set categories and metadata
   - Publish or save as draft

2. **Site Management**
   - Update site configuration
   - Manage categories
   - View all posts (published/unpublished)

3. **Database**
   - Automatic backups recommended
   - Use SQLite browser for direct access
   - Reset with `npm run db:reset`

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module 'better-sqlite3'"**
```bash
npm install better-sqlite3
```

**"Cannot find module 'jose'"**
```bash
npm install jose
```

**"SQLITE_ERROR: no such table"**
```bash
npm run db:setup
```

**Login redirects immediately**
- Check browser cookies are enabled
- Verify JWT_SECRET is set
- Clear cookies and try again

## 🤝 Contributing

This is a personal blog template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review browser console for errors
3. Verify all dependencies are installed
4. Ensure database is initialized

---

**Made with ❤️ using Next.js and SQLite**
