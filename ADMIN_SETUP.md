# Admin Interface Setup Guide

## Overview

Your blog now has a secure admin interface with authentication. You can manage all content through a web-based dashboard.

## Features

- 🔐 **Secure Login** - JWT-based authentication with HTTP-only cookies
- 📝 **Post Management** - Create, edit, and delete blog posts
- 🏷️ **Category Management** - Organize posts by categories
- ⚙️ **Site Configuration** - Update site title, description, and author info
- 🚪 **Logout** - Secure session termination

## Quick Start

### 1. Install Required Package

The admin interface uses JWT for authentication. Install the required package:

```bash
npm install jose
```

### 2. Set Up Environment Variables (Optional but Recommended)

Copy the example environment file:

```bash
copy env.example .env.local
```

Edit `.env.local` and change the default credentials:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-random-secret-key
```

**Generate a secure JWT secret:**
```bash
# On Linux/Mac/Git Bash:
openssl rand -base64 32

# Or use any random string generator
```

### 3. Access the Admin Interface

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login page:
   ```
   http://localhost:3000/admin/login
   ```

3. Log in with your credentials:
   - **Default Username:** `admin`
   - **Default Password:** `admin123`
   - (Or use your custom credentials from `.env.local`)

## Admin Interface Features

### Dashboard Overview

Once logged in, you'll see the admin dashboard with four main tabs:

#### 1. Posts Tab
- View all posts (published and unpublished)
- See post status badges (Published, Featured, Category)
- Edit or delete existing posts
- Quick access to post management

#### 2. New Post Tab
Create new blog posts with:
- **Title** - Post title
- **Slug** - URL-friendly identifier (e.g., "my-first-post")
- **Excerpt** - Short summary for post listings
- **Content** - Full post content (Markdown supported)
- **Category** - Select from existing categories
- **Read Time** - Estimated reading time (e.g., "5 min read")
- **Published** - Toggle to make post visible on the site
- **Featured** - Toggle to feature the post on homepage

#### 3. Categories Tab
- View all existing categories
- See category names and slugs
- (Future: Add/edit/delete categories)

#### 4. Site Config Tab
Update site-wide settings:
- **Site Title** - Your blog's name
- **Site Description** - Tagline or description
- **Site Author** - Your name
- **Site Email** - Contact email

### Logout

Click the "Logout" button in the top-right corner to end your session securely.

## Security Features

### Authentication Flow

1. **Login** - Credentials verified against environment variables or defaults
2. **Session Creation** - JWT token generated and stored in HTTP-only cookie
3. **Protected Routes** - Admin pages check for valid session
4. **Auto-Redirect** - Unauthenticated users redirected to login page
5. **Logout** - Session cookie deleted, user redirected to login

### Session Details

- **Duration:** 24 hours
- **Storage:** HTTP-only cookie (not accessible via JavaScript)
- **Encryption:** JWT with HS256 algorithm
- **Auto-Expiry:** Sessions expire after 24 hours

### Security Best Practices

✅ **Do:**
- Change default credentials immediately
- Use strong, unique passwords
- Set a random JWT secret
- Use HTTPS in production
- Keep credentials in environment variables
- Never commit `.env.local` to version control

❌ **Don't:**
- Use default credentials in production
- Share your JWT secret
- Commit credentials to Git
- Use weak passwords
- Expose admin URLs publicly without additional protection

## Production Deployment

### Required Steps

1. **Set Environment Variables**
   ```env
   ADMIN_USERNAME=your_secure_username
   ADMIN_PASSWORD=your_very_secure_password
   JWT_SECRET=your_random_64_character_secret
   NODE_ENV=production
   ```

2. **Enable HTTPS**
   - The session cookie will use `secure` flag in production
   - Ensures cookies only sent over HTTPS

3. **Additional Security (Recommended)**
   - Add rate limiting to prevent brute force attacks
   - Implement IP whitelisting for admin routes
   - Add two-factor authentication (2FA)
   - Set up monitoring and alerts
   - Regular security audits

### Deployment Platforms

#### Vercel
```bash
# Set environment variables in Vercel dashboard
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET
```

#### Netlify
```bash
# Set in Netlify dashboard under Site settings > Environment variables
```

#### Other Platforms
Add environment variables through your platform's dashboard or CLI.

## Accessing the Admin Interface

### Footer Link

A discreet "Admin" link is available at the bottom of every page in the footer. This provides easy access without being prominently displayed to regular visitors.

### Direct URLs

- **Login:** `/admin/login`
- **Dashboard:** `/admin`

## Troubleshooting

### "Cannot find module 'jose'"

Install the package:
```bash
npm install jose
```

### "Invalid credentials"

- Check your username and password
- Verify environment variables are loaded correctly
- Default credentials: `admin` / `admin123`

### Redirected to login after logging in

- Check browser console for errors
- Verify JWT_SECRET is set
- Clear cookies and try again
- Check that cookies are enabled in your browser

### Session expires too quickly

- Sessions last 24 hours by default
- Check system time is correct
- Verify JWT_SECRET hasn't changed

### Can't access admin page

- Make sure you're logged in
- Check that session cookie exists (browser dev tools)
- Try logging out and back in

## API Endpoints

The admin interface uses these API endpoints:

### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/session` - Check current session status

### Content Management
- `GET /api/posts?published=false` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/[slug]` - Update post
- `DELETE /api/posts/[slug]` - Delete post
- `GET /api/categories` - Get all categories
- `GET /api/config` - Get site configuration
- `PUT /api/config` - Update site configuration

## Future Enhancements

Potential improvements for the admin interface:

- [ ] Rich text editor for post content
- [ ] Image upload and management
- [ ] Draft auto-save
- [ ] Post preview before publishing
- [ ] Category creation/editing/deletion
- [ ] Tag management
- [ ] User management (multiple admin users)
- [ ] Activity logs
- [ ] Analytics dashboard
- [ ] Bulk operations
- [ ] Search and filtering
- [ ] Two-factor authentication (2FA)

## Support

For issues or questions:
- Check the main `INSTALLATION.md` for setup help
- Review `DATABASE_SETUP.md` for database information
- Check browser console for error messages
- Verify all dependencies are installed

## Security Disclosure

If you discover a security vulnerability, please:
1. Do not open a public issue
2. Contact the site administrator directly
3. Provide details of the vulnerability
4. Allow time for a fix before public disclosure
