import db from './db';
import fs from 'fs';
import path from 'path';

export function initializeDatabase() {
  try {
    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export function seedDatabase() {
  try {
    // Check if data already exists
    const existingPosts = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
    if (existingPosts.count > 0) {
      console.log('Database already seeded');
      return;
    }

    // Insert site configuration
    const insertConfig = db.prepare('INSERT INTO site_config (key, value) VALUES (?, ?)');
    insertConfig.run('site_title', 'My Blog');
    insertConfig.run('site_description', 'Thoughts on tech, science, life, philosophy and everything in between');
    insertConfig.run('site_author', 'Mulima Chibuye');
    insertConfig.run('site_email', 'hello@mulimachibuye.com');

    // Insert categories
    const insertCategory = db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)');
    const categories = [
      { name: 'Web Development', slug: 'web-development', description: 'Articles about web development' },
      { name: 'Programming', slug: 'programming', description: 'Programming concepts and best practices' },
      { name: 'Technology', slug: 'technology', description: 'Technology trends and insights' },
      { name: 'Tools', slug: 'tools', description: 'Developer tools and productivity' },
      { name: 'Personal', slug: 'personal', description: 'Personal thoughts and experiences' },
    ];

    const categoryIds: Record<string, number> = {};
    categories.forEach(cat => {
      const result = insertCategory.run(cat.name, cat.slug, cat.description);
      categoryIds[cat.slug] = Number(result.lastInsertRowid);
    });

    // Insert sample blog posts
    const insertPost = db.prepare(`
      INSERT INTO posts (title, slug, excerpt, content, category_id, read_time, published, featured, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const posts = [
      {
        title: 'Getting Started with Next.js 15: A Complete Guide',
        slug: 'getting-started-nextjs-15',
        excerpt: 'Exploring the latest features in Next.js 15 and how they can improve your development workflow. From App Router improvements to new caching strategies.',
        content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements that make building React applications even better.

## Key Features

- Improved App Router performance
- Enhanced caching strategies
- Better TypeScript support
- New middleware capabilities

This is a comprehensive guide to help you get started with Next.js 15.`,
        category_id: categoryIds['web-development'],
        read_time: '8 min read',
        published: 1,
        featured: 1,
        published_at: '2024-01-15 10:00:00',
      },
      {
        title: 'The Art of Clean Code: Lessons from 5 Years of Development',
        slug: 'art-of-clean-code',
        excerpt: 'Reflections on writing maintainable, readable code and the practices that have made the biggest difference in my career as a developer.',
        content: `# The Art of Clean Code

After 5 years of professional development, here are the most important lessons I've learned about writing clean code.

## Key Principles

1. Write code for humans first
2. Keep functions small and focused
3. Use meaningful names
4. Don't repeat yourself (DRY)

These principles have transformed how I approach software development.`,
        category_id: categoryIds['programming'],
        read_time: '12 min read',
        published: 1,
        featured: 0,
        published_at: '2024-01-10 10:00:00',
      },
      {
        title: 'Building a Home Lab: My Journey into Self-Hosting',
        slug: 'building-home-lab',
        excerpt: 'How I set up my own home server, the challenges I faced, and why self-hosting has become an essential part of my tech journey.',
        content: `# Building a Home Lab

Self-hosting has become increasingly popular, and for good reason. Here's my journey into building a home lab.

## Why Self-Host?

- Privacy and control
- Learning opportunity
- Cost savings over time
- Fun and rewarding

I'll walk you through my setup and the lessons learned along the way.`,
        category_id: categoryIds['technology'],
        read_time: '15 min read',
        published: 1,
        featured: 0,
        published_at: '2024-01-05 10:00:00',
      },
      {
        title: 'Why I Switched from VS Code to Neovim',
        slug: 'vscode-to-neovim',
        excerpt: 'My experience transitioning from VS Code to Neovim, the learning curve, and the productivity gains I\'ve experienced along the way.',
        content: `# Why I Switched from VS Code to Neovim

After years of using VS Code, I decided to make the switch to Neovim. Here's why.

## The Journey

- Initial struggles with the learning curve
- Discovering the power of modal editing
- Customization and performance benefits
- Productivity improvements

The switch wasn't easy, but it was worth it.`,
        category_id: categoryIds['tools'],
        read_time: '10 min read',
        published: 1,
        featured: 0,
        published_at: '2023-12-28 10:00:00',
      },
    ];

    posts.forEach(post => {
      insertPost.run(
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.category_id,
        post.read_time,
        post.published,
        post.featured,
        post.published_at
      );
    });

    // Insert social links
    const insertSocial = db.prepare('INSERT INTO social_links (platform, url, display_order) VALUES (?, ?, ?)');
    insertSocial.run('Email', 'mailto:hello@mulimachibuye.com', 1);
    insertSocial.run('Twitter', 'https://twitter.com/mulimac', 2);
    insertSocial.run('GitHub', 'https://github.com/mulima', 3);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase();
  seedDatabase();
  console.log('Database setup complete!');
  process.exit(0);
}
