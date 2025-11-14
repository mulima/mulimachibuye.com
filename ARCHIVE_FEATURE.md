# Archive Feature Documentation

## Overview
The archive feature allows you to move posts and academic content (publications, education) to an archive instead of deleting them. This keeps your main pages clean while preserving historical content.

## How It Works

### Database Schema
- Added `archived` column (BOOLEAN, default 0) to:
  - `posts` table
  - `publications` table
  - `education` table

### API Endpoints

#### Posts
- `GET /api/posts` - Returns non-archived posts (default)
- `GET /api/posts?archived=true` - Returns only archived posts
- `PUT /api/posts/[slug]` - Can update `archived` field

#### Publications
- `GET /api/academics/publications` - Returns non-archived publications (default)
- `GET /api/academics/publications?archived=true` - Returns only archived publications
- `PUT /api/academics/publications` - Can update `archived` field

#### Education
- `GET /api/academics/education` - Returns non-archived education (default)
- `GET /api/academics/education?archived=true` - Returns only archived education
- `PUT /api/academics/education` - Can update `archived` field

## Admin Panel Usage

### Archive Content
1. Go to `/admin/` and log in
2. Navigate to the appropriate tab (Posts, Academics)
3. Click the **Archive icon** (📦) next to any item
4. Confirm the action
5. Item is now archived and hidden from main pages

### Unarchive Content
1. In admin panel, archived items show **ArchiveRestore icon** (📤)
2. Click it to restore the item
3. Confirm the action
4. Item returns to active status

### Visual Indicators
- **Archive icon** (📦) - For active items
- **ArchiveRestore icon** (📤) - For archived items
- Tooltip shows "Archive" or "Unarchive" on hover

## Archive Page

### Location
`/archive/` - Public page showing all archived content

### Sections
1. **Archived Blog Posts**
   - Organized by year
   - Shows publication date, read time, category
   - Links to full post pages

2. **Archived Publications**
   - Lists all archived publications
   - Shows authors, venue, year, type

3. **Archived Education**
   - Lists all archived education entries
   - Shows degree, institution, duration

4. **Empty State**
   - Displays message when no archived content exists

## Benefits

1. **Non-destructive** - Keep historical content without deleting
2. **Clean main pages** - Hide outdated content from primary views
3. **Reversible** - Easy to restore archived items
4. **Organized** - Dedicated archive page for browsing old content
5. **SEO friendly** - Archived posts still accessible via direct URLs

## Technical Details

### Migration
- Migration script: `lib/add-archived-column.ts`
- Run with: `npx tsx lib/add-archived-column.ts`
- Adds `archived` column to existing tables

### TypeScript Interfaces
Updated interfaces in:
- `lib/db-queries.ts` - Database query types
- `app/admin/page.tsx` - Admin panel types
- `app/archive/page.tsx` - Archive page types

### Components Used
- Archive icon from `lucide-react`
- ArchiveRestore icon from `lucide-react`
- Card components for displaying archived items
- Badge components for metadata

## Future Enhancements

Potential additions:
- Bulk archive/unarchive operations
- Archive date tracking
- Search within archived content
- Export archived content
- Archive statistics dashboard
