# Database Setup Guide

This project uses SQLite for dynamic content management. Follow these steps to set up the database.

## Prerequisites

Make sure you have the required packages installed:

```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

## Database Schema

The database includes the following tables:

### Core Tables

1. **site_config** - Site-wide configuration (title, description, author, etc.)
2. **categories** - Blog post categories
3. **posts** - Blog posts with full content
4. **tags** - Post tags (for future use)
5. **post_tags** - Many-to-many relationship between posts and tags
6. **social_links** - Social media links for the footer
7. **newsletter_subscribers** - Email subscribers

### Schema Details

#### site_config
- `id` - Primary key
- `key` - Configuration key (unique)
- `value` - Configuration value
- `updated_at` - Last update timestamp

#### categories
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly slug (unique)
- `description` - Category description
- `created_at` - Creation timestamp

#### posts
- `id` - Primary key
- `title` - Post title
- `slug` - URL-friendly slug (unique)
- `excerpt` - Short excerpt/summary
- `content` - Full post content (Markdown supported)
- `category_id` - Foreign key to categories
- `read_time` - Estimated reading time (e.g., "5 min read")
- `published` - Boolean (0 or 1)
- `featured` - Boolean (0 or 1) - Featured posts appear first
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `published_at` - Publication timestamp

#### social_links
- `id` - Primary key
- `platform` - Platform name (e.g., "Twitter", "GitHub")
- `url` - Full URL
- `display_order` - Order for display
- `created_at` - Creation timestamp

#### newsletter_subscribers
- `id` - Primary key
- `email` - Subscriber email (unique)
- `subscribed` - Boolean (0 or 1)
- `subscribed_at` - Subscription timestamp
- `unsubscribed_at` - Unsubscription timestamp (if applicable)

## Setup Instructions

### 1. Initialize the Database

Run the initialization script using Node.js:

```bash
node -r esbuild-register lib/init-db.ts
```

Or use ts-node if you have it installed:

```bash
npx ts-node lib/init-db.ts
```

This will:
- Create the `blog.db` file in your project root
- Create all necessary tables
- Seed the database with sample data

### 2. Verify Database Creation

After running the setup, you should see:
- A `blog.db` file in your project root
- Console output confirming successful initialization and seeding

### 3. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog with database-driven content.

## API Endpoints

The following API endpoints are available:

### Posts
- `GET /api/posts` - Get all posts (add `?published=false` to include unpublished)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[slug]` - Get a specific post by slug
- `PUT /api/posts/[slug]` - Update a post
- `DELETE /api/posts/[slug]` - Delete a post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Site Configuration
- `GET /api/config` - Get all site configuration
- `PUT /api/config` - Update site configuration

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter

## Admin Interface

Access the admin dashboard at `/admin` to:
- View all posts (published and unpublished)
- Create new posts
- Edit existing posts
- Delete posts
- Manage categories
- Update site configuration

**Note:** This is a basic admin interface without authentication. In production, you should add proper authentication and authorization.

## Database Management

### Viewing Database Contents

You can use any SQLite browser to view and edit the database:
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Recommended)
- [SQLite Viewer (VS Code Extension)](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)

### Backup Database

Simply copy the `blog.db` file to create a backup:

```bash
cp blog.db blog.db.backup
```

### Reset Database

To reset the database with fresh sample data:

1. Delete the existing database:
   ```bash
   rm blog.db
   ```

2. Re-run the initialization script:
   ```bash
   node -r esbuild-register lib/init-db.ts
   ```

## Customization

### Adding New Configuration Keys

Edit `lib/init-db.ts` and add new configuration entries in the `seedDatabase()` function:

```typescript
insertConfig.run('new_key', 'new_value');
```

### Modifying Schema

1. Edit `lib/schema.sql` with your changes
2. Delete `blog.db`
3. Re-run the initialization script

**Warning:** This will delete all existing data. Make sure to backup first!

## Troubleshooting

### "Cannot find module 'better-sqlite3'"

Make sure you've installed the package:
```bash
npm install better-sqlite3
```

### "SQLITE_ERROR: no such table"

The database hasn't been initialized. Run:
```bash
node -r esbuild-register lib/init-db.ts
```

### PowerShell Execution Policy Error

If you get an execution policy error when running npm commands, you can:

1. Run PowerShell as Administrator
2. Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Or use Command Prompt instead of PowerShell

## Production Considerations

Before deploying to production:

1. **Add Authentication** - Protect the `/admin` route
2. **Environment Variables** - Move sensitive configuration to environment variables
3. **Database Backups** - Set up automated backups
4. **Input Validation** - Add comprehensive validation for all API endpoints
5. **Rate Limiting** - Add rate limiting to prevent abuse
6. **HTTPS** - Ensure all connections use HTTPS
7. **Database Location** - Consider using a persistent volume for the database file

## Next Steps

- Add image upload functionality
- Implement search functionality
- Add comment system
- Create RSS feed
- Add sitemap generation
- Implement SEO metadata management
