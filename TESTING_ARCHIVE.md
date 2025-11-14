# Testing the Archive Feature

## Prerequisites
- Database has been migrated with `archived` column
- Server is running (`npm run dev`)
- You have admin access

## Test Checklist

### 1. Test Post Archiving

#### Archive a Post
- [ ] Go to `/admin/` and log in
- [ ] Navigate to "Posts" tab
- [ ] Click the Archive icon (📦) on a post
- [ ] Confirm the action
- [ ] Verify success message appears
- [ ] Verify post is still visible in admin (with ArchiveRestore icon)
- [ ] Go to homepage - verify post is NOT visible
- [ ] Go to `/archive/` - verify post IS visible there

#### Unarchive a Post
- [ ] In admin panel, find the archived post (has ArchiveRestore icon)
- [ ] Click the ArchiveRestore icon
- [ ] Confirm the action
- [ ] Verify success message appears
- [ ] Verify post now shows Archive icon (not ArchiveRestore)
- [ ] Go to homepage - verify post IS visible again
- [ ] Go to `/archive/` - verify post is NOT visible there

### 2. Test Publication Archiving

#### Archive a Publication
- [ ] Go to `/admin/` → "Academics" tab
- [ ] Find a publication in "All Publications" section
- [ ] Click the Archive icon (📦)
- [ ] Confirm the action
- [ ] Verify success message appears
- [ ] Go to `/academics/` - verify publication is NOT visible
- [ ] Go to `/archive/` - verify publication IS visible in "Archived Publications"

#### Unarchive a Publication
- [ ] In admin "Academics" tab, find archived publication
- [ ] Click the ArchiveRestore icon
- [ ] Confirm the action
- [ ] Verify success message
- [ ] Go to `/academics/` - verify publication IS visible again
- [ ] Go to `/archive/` - verify publication is NOT visible

### 3. Test Education Archiving

#### Archive Education
- [ ] Go to `/admin/` → "Academics" tab
- [ ] Find an education entry in "All Education" section
- [ ] Click the Archive icon (📦)
- [ ] Confirm the action
- [ ] Verify success message appears
- [ ] Go to `/academics/` - verify education is NOT visible
- [ ] Go to `/archive/` - verify education IS visible in "Archived Education"

#### Unarchive Education
- [ ] In admin "Academics" tab, find archived education
- [ ] Click the ArchiveRestore icon
- [ ] Confirm the action
- [ ] Verify success message
- [ ] Go to `/academics/` - verify education IS visible again
- [ ] Go to `/archive/` - verify education is NOT visible

### 4. Test Archive Page

#### Empty State
- [ ] Archive all content (posts, publications, education)
- [ ] Go to `/archive/`
- [ ] Verify "No archived content yet" message appears

#### With Content
- [ ] Archive at least one item from each type
- [ ] Go to `/archive/`
- [ ] Verify three sections appear:
  - Archived Blog Posts (with year grouping)
  - Archived Publications
  - Archived Education
- [ ] Verify each section shows correct count
- [ ] Verify post links work
- [ ] Verify dates display correctly

### 5. Test API Endpoints

#### Posts API
```bash
# Get active posts (should exclude archived)
curl http://localhost:3000/api/posts

# Get archived posts only
curl http://localhost:3000/api/posts?archived=true
```

#### Publications API
```bash
# Get active publications
curl http://localhost:3000/api/academics/publications

# Get archived publications
curl http://localhost:3000/api/academics/publications?archived=true
```

#### Education API
```bash
# Get active education
curl http://localhost:3000/api/academics/education

# Get archived education
curl http://localhost:3000/api/academics/education?archived=true
```

### 6. Test Edge Cases

- [ ] Archive all posts - verify homepage shows "No posts yet"
- [ ] Archive all publications - verify academics page handles it gracefully
- [ ] Archive and unarchive the same item multiple times
- [ ] Try to access archived post directly via `/blog/[slug]` - should still work
- [ ] Verify archived items maintain their data (not deleted)

### 7. Test Admin Panel UI

- [ ] Verify Archive icon appears for active items
- [ ] Verify ArchiveRestore icon appears for archived items
- [ ] Verify tooltips show "Archive" or "Unarchive"
- [ ] Verify icons are properly aligned with Edit and Delete buttons
- [ ] Test on mobile viewport (buttons should still be accessible)

## Expected Behavior

### Active Content
- Visible on main pages (homepage, academics page)
- Shows Archive icon in admin panel
- NOT visible on `/archive/` page
- API returns when `archived=false` or no parameter

### Archived Content
- NOT visible on main pages
- Shows ArchiveRestore icon in admin panel
- Visible on `/archive/` page
- API returns only when `archived=true`
- Still accessible via direct URL

## Common Issues

### Archive button not working
- Check browser console for errors
- Verify API route is responding
- Check database has `archived` column

### Archived items still showing on main pages
- Clear browser cache
- Check API is filtering correctly
- Verify database value is 1 (not 0)

### Archive page not loading
- Check `/archive/page.tsx` has no syntax errors
- Verify API endpoints are accessible
- Check browser console for fetch errors

## Success Criteria

✅ All items can be archived and unarchived
✅ Archived items hidden from main pages
✅ Archived items visible on archive page
✅ Archive page shows correct sections and counts
✅ No errors in browser console
✅ No errors in server logs
✅ Build completes successfully
✅ All links work correctly
