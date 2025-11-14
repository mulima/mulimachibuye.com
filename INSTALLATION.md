# Installation Guide

## Quick Start

Follow these steps to get your dynamic blog up and running with SQLite database.

### Step 1: Install Dependencies

First, you need to install the required packages. Since you're on Windows with PowerShell execution policy restrictions, you have a few options:

#### Option A: Use Command Prompt (Recommended)
Open Command Prompt (cmd.exe) and run:
```cmd
npm install better-sqlite3 @types/better-sqlite3 tsx jose
```

#### Option B: Change PowerShell Execution Policy
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Then run: `npm install better-sqlite3 @types/better-sqlite3 tsx jose`

#### Option C: Use Git Bash or WSL
If you have Git Bash or WSL installed, you can use those terminals instead.

### Step 2: Initialize the Database

After installing the dependencies, initialize the database:

```bash
npm run db:setup
```

This will:
- Create a `blog.db` file in your project root
- Create all necessary tables (posts, categories, site_config, etc.)
- Seed the database with sample blog posts and configuration

### Step 3: Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog!

### Step 4: Access the Admin Panel

1. Click the "Admin" link at the bottom of the page footer, or navigate directly to:
   ```
   http://localhost:3000/admin/login
   ```

2. Log in with the default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

3. Once logged in, you can:
   - Create, edit, and delete blog posts
   - Manage categories
   - Update site configuration (title, description, author, etc.)

**Important:** Change the default credentials! See `ADMIN_SETUP.md` for details.

## What Was Created

### Database Files
- `lib/db.ts` - Database connection
- `lib/schema.sql` - Database schema definition
- `lib/init-db.ts` - Database initialization and seeding script
- `lib/db-queries.ts` - Database query functions

### API Routes
- `app/api/posts/route.ts` - Get all posts, create new post
- `app/api/posts/[slug]/route.ts` - Get, update, delete specific post
- `app/api/categories/route.ts` - Get all categories, create new category
- `app/api/config/route.ts` - Get and update site configuration
- `app/api/newsletter/route.ts` - Newsletter subscription
- `app/api/auth/login/route.ts` - Admin login
- `app/api/auth/logout/route.ts` - Admin logout
- `app/api/auth/session/route.ts` - Check authentication status

### Authentication
- `lib/auth.ts` - JWT-based authentication utilities
- `app/admin/login/page.tsx` - Admin login page

### Pages
- `app/page.tsx` - Updated to fetch data from database (Server Component)
- `app/admin/page.tsx` - Protected admin dashboard for content management
- `components/ClientWrapper.tsx` - Client component wrapper for header/navigation

### Documentation
- `DATABASE_SETUP.md` - Detailed database documentation
- `ADMIN_SETUP.md` - Admin interface and authentication guide
- `INSTALLATION.md` - This file
- `env.example` - Environment variables template

## Database Schema

Your database includes these tables:

1. **site_config** - Site settings (title, description, author, email)
2. **categories** - Blog post categories
3. **posts** - Blog posts with full content (Markdown supported)
4. **tags** - Post tags (for future use)
5. **post_tags** - Many-to-many relationship for post tags
6. **social_links** - Social media links
7. **newsletter_subscribers** - Email subscribers

## Managing Content

### Creating a New Post

1. Go to `http://localhost:3000/admin`
2. Click on the "New Post" tab
3. Fill in the form:
   - **Title**: Post title
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Excerpt**: Short summary
   - **Content**: Full post content (Markdown supported)
   - **Category**: Select from dropdown
   - **Read Time**: e.g., "5 min read"
   - **Published**: Check to make it visible on the site
   - **Featured**: Check to make it the featured post
4. Click "Create Post"

### Updating Site Configuration

1. Go to `http://localhost:3000/admin`
2. Click on the "Site Config" tab
3. Update the fields:
   - Site Title
   - Site Description
   - Site Author
   - Site Email
4. Click "Update Configuration"

## Resetting the Database

If you want to start fresh with sample data:

```bash
npm run db:reset
```

**Warning:** This will delete all your existing data!

## Troubleshooting

### "Cannot find module 'better-sqlite3'"
- Make sure you've installed the package: `npm install better-sqlite3`

### "SQLITE_ERROR: no such table"
- Run the database setup: `npm run db:setup`

### TypeScript errors about missing modules
- Restart your TypeScript server in VS Code (Ctrl+Shift+P → "TypeScript: Restart TS Server")
- Make sure all dependencies are installed

### Admin page shows empty data
- Make sure the database is initialized: `npm run db:setup`
- Check the browser console for errors
- Verify the database file exists: `blog.db` should be in your project root

## Next Steps

Now that your dynamic blog is set up, you can:

1. **Customize the design** - Edit the Tailwind classes in your components
2. **Add authentication** - Protect the `/admin` route with NextAuth.js or similar
3. **Add image uploads** - Integrate with a service like Cloudinary or use local storage
4. **Create individual blog post pages** - Create `app/blog/[slug]/page.tsx`
5. **Add search functionality** - Implement full-text search
6. **Create category pages** - Create `app/category/[slug]/page.tsx`
7. **Add RSS feed** - Generate an RSS feed from your posts
8. **Implement SEO** - Add metadata and Open Graph tags

## Production Deployment

Before deploying to production:

1. Add authentication to protect `/admin`
2. Set up database backups
3. Add input validation and sanitization
4. Implement rate limiting
5. Use environment variables for sensitive data
6. Consider using a more robust database solution (PostgreSQL, MySQL) for production

## Support

For detailed database documentation, see `DATABASE_SETUP.md`.

For issues or questions, check:
- Next.js documentation: https://nextjs.org/docs
- better-sqlite3 documentation: https://github.com/WiseLibs/better-sqlite3
