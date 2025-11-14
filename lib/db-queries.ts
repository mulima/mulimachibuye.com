import db from './db';

// Types
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  read_time: string | null;
  published: number;
  featured: number;
  archived: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface SiteConfig {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  display_order: number;
  created_at: string;
}

// Site Configuration
export function getSiteConfig(key: string): string | null {
  const stmt = db.prepare('SELECT value FROM site_config WHERE key = ?');
  const result = stmt.get(key) as { value: string } | undefined;
  return result?.value || null;
}

export function getAllSiteConfig(): Record<string, string> {
  const stmt = db.prepare('SELECT key, value FROM site_config');
  const results = stmt.all() as { key: string; value: string }[];
  return results.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

export function updateSiteConfig(key: string, value: string): void {
  const stmt = db.prepare(`
    INSERT INTO site_config (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(key, value, value);
}

// Categories
export function getAllCategories(): Category[] {
  const stmt = db.prepare('SELECT * FROM categories ORDER BY name');
  return stmt.all() as Category[];
}

export function getCategoryBySlug(slug: string): Category | null {
  const stmt = db.prepare('SELECT * FROM categories WHERE slug = ?');
  return stmt.get(slug) as Category | null;
}

export function createCategory(name: string, slug: string, description?: string): number {
  const stmt = db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)');
  const result = stmt.run(name, slug, description || null);
  return Number(result.lastInsertRowid);
}

export function updateCategory(id: number, name: string, slug: string, description?: string): void {
  const stmt = db.prepare('UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?');
  stmt.run(name, slug, description || null, id);
}

export function deleteCategory(id: number): void {
  const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
  stmt.run(id);
}

// Posts
export function getAllPosts(publishedOnly = true): Post[] {
  let query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
  `;
  
  if (publishedOnly) {
    query += ' WHERE p.published = 1';
  }
  
  query += ' ORDER BY p.published_at DESC, p.created_at DESC';
  
  const stmt = db.prepare(query);
  return stmt.all() as Post[];
}

export function getFeaturedPost(): Post | null {
  const stmt = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.published = 1 AND p.featured = 1
    ORDER BY p.published_at DESC
    LIMIT 1
  `);
  return stmt.get() as Post | null;
}

export function getPostBySlug(slug: string): Post | null {
  const stmt = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
  `);
  return stmt.get(slug) as Post | null;
}

export function getPostsByCategory(categorySlug: string, publishedOnly = true): Post[] {
  let query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM posts p
    INNER JOIN categories c ON p.category_id = c.id
    WHERE c.slug = ?
  `;
  
  if (publishedOnly) {
    query += ' AND p.published = 1';
  }
  
  query += ' ORDER BY p.published_at DESC, p.created_at DESC';
  
  const stmt = db.prepare(query);
  return stmt.all(categorySlug) as Post[];
}

export function createPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category_id?: number;
  read_time?: string;
  published?: boolean;
  featured?: boolean;
}): number {
  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, category_id, read_time, published, featured, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const publishedAt = data.published ? new Date().toISOString() : null;
  
  const result = stmt.run(
    data.title,
    data.slug,
    data.excerpt || null,
    data.content,
    data.category_id || null,
    data.read_time || null,
    data.published ? 1 : 0,
    data.featured ? 1 : 0,
    publishedAt
  );
  
  return Number(result.lastInsertRowid);
}

export function updatePost(id: number, data: {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category_id?: number;
  read_time?: string;
  published?: boolean;
  featured?: boolean;
}): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  if (data.title !== undefined) {
    fields.push('title = ?');
    values.push(data.title);
  }
  if (data.slug !== undefined) {
    fields.push('slug = ?');
    values.push(data.slug);
  }
  if (data.excerpt !== undefined) {
    fields.push('excerpt = ?');
    values.push(data.excerpt);
  }
  if (data.content !== undefined) {
    fields.push('content = ?');
    values.push(data.content);
  }
  if (data.category_id !== undefined) {
    fields.push('category_id = ?');
    values.push(data.category_id);
  }
  if (data.read_time !== undefined) {
    fields.push('read_time = ?');
    values.push(data.read_time);
  }
  if (data.published !== undefined) {
    fields.push('published = ?');
    values.push(data.published ? 1 : 0);
    
    // Update published_at if changing to published
    if (data.published) {
      fields.push('published_at = ?');
      values.push(new Date().toISOString());
    }
  }
  if (data.featured !== undefined) {
    fields.push('featured = ?');
    values.push(data.featured ? 1 : 0);
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deletePost(id: number): void {
  const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
  stmt.run(id);
}

// Social Links
export function getAllSocialLinks(): SocialLink[] {
  const stmt = db.prepare('SELECT * FROM social_links ORDER BY display_order');
  return stmt.all() as SocialLink[];
}

export function createSocialLink(platform: string, url: string, displayOrder = 0): number {
  const stmt = db.prepare('INSERT INTO social_links (platform, url, display_order) VALUES (?, ?, ?)');
  const result = stmt.run(platform, url, displayOrder);
  return Number(result.lastInsertRowid);
}

export function updateSocialLink(id: number, platform: string, url: string, displayOrder?: number): void {
  const stmt = db.prepare('UPDATE social_links SET platform = ?, url = ?, display_order = ? WHERE id = ?');
  stmt.run(platform, url, displayOrder || 0, id);
}

export function deleteSocialLink(id: number): void {
  const stmt = db.prepare('DELETE FROM social_links WHERE id = ?');
  stmt.run(id);
}

// Newsletter
export function subscribeToNewsletter(email: string): number {
  const stmt = db.prepare(`
    INSERT INTO newsletter_subscribers (email)
    VALUES (?)
    ON CONFLICT(email) DO UPDATE SET subscribed = 1, unsubscribed_at = NULL
  `);
  const result = stmt.run(email);
  return Number(result.lastInsertRowid);
}

export function unsubscribeFromNewsletter(email: string): void {
  const stmt = db.prepare(`
    UPDATE newsletter_subscribers
    SET subscribed = 0, unsubscribed_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `);
  stmt.run(email);
}

export function getAllSubscribers(activeOnly = true): { id: number; email: string; subscribed_at: string }[] {
  let query = 'SELECT id, email, subscribed_at FROM newsletter_subscribers';
  
  if (activeOnly) {
    query += ' WHERE subscribed = 1';
  }
  
  query += ' ORDER BY subscribed_at DESC';
  
  const stmt = db.prepare(query);
  return stmt.all() as { id: number; email: string; subscribed_at: string }[];
}

// Academic Types
export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  status: string;
  abstract: string | null;
  doi: string | null;
  pdf_url: string | null;
  citations: number;
  archived: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchProject {
  id: number;
  title: string;
  description: string;
  duration: string;
  role: string;
  funding: string | null;
  collaborators: string | null;
  technologies: string | null;
  status: string;
  archived: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Presentation {
  id: number;
  title: string;
  event: string;
  location: string;
  date: string;
  type: string;
  slides_url: string | null;
  archived: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  thesis: string | null;
  advisor: string | null;
  gpa: string | null;
  honors: string | null;
  archived: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string | null;
  archived: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Publications
export function getAllPublications(): Publication[] {
  const stmt = db.prepare('SELECT * FROM publications ORDER BY year DESC, display_order ASC');
  return stmt.all() as Publication[];
}

export function getPublicationById(id: number): Publication | null {
  const stmt = db.prepare('SELECT * FROM publications WHERE id = ?');
  return stmt.get(id) as Publication | null;
}

export function createPublication(data: Omit<Publication, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO publications (title, authors, venue, year, type, status, abstract, doi, pdf_url, citations, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.title, data.authors, data.venue, data.year, data.type, data.status,
    data.abstract, data.doi, data.pdf_url, data.citations, data.display_order
  );
  return Number(result.lastInsertRowid);
}

export function updatePublication(id: number, data: Partial<Omit<Publication, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE publications SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deletePublication(id: number): void {
  const stmt = db.prepare('DELETE FROM publications WHERE id = ?');
  stmt.run(id);
}

// Research Projects
export function getAllResearchProjects(): ResearchProject[] {
  const stmt = db.prepare('SELECT * FROM research_projects ORDER BY display_order ASC');
  return stmt.all() as ResearchProject[];
}

export function getResearchProjectById(id: number): ResearchProject | null {
  const stmt = db.prepare('SELECT * FROM research_projects WHERE id = ?');
  return stmt.get(id) as ResearchProject | null;
}

export function createResearchProject(data: Omit<ResearchProject, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO research_projects (title, description, duration, role, funding, collaborators, technologies, status, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.title, data.description, data.duration, data.role, data.funding,
    data.collaborators, data.technologies, data.status, data.display_order
  );
  return Number(result.lastInsertRowid);
}

export function updateResearchProject(id: number, data: Partial<Omit<ResearchProject, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE research_projects SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deleteResearchProject(id: number): void {
  const stmt = db.prepare('DELETE FROM research_projects WHERE id = ?');
  stmt.run(id);
}

// Presentations
export function getAllPresentations(): Presentation[] {
  const stmt = db.prepare('SELECT * FROM presentations ORDER BY date DESC, display_order ASC');
  return stmt.all() as Presentation[];
}

export function getPresentationById(id: number): Presentation | null {
  const stmt = db.prepare('SELECT * FROM presentations WHERE id = ?');
  return stmt.get(id) as Presentation | null;
}

export function createPresentation(data: Omit<Presentation, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO presentations (title, event, location, date, type, slides_url, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.title, data.event, data.location, data.date, data.type, data.slides_url, data.display_order
  );
  return Number(result.lastInsertRowid);
}

export function updatePresentation(id: number, data: Partial<Omit<Presentation, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE presentations SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deletePresentation(id: number): void {
  const stmt = db.prepare('DELETE FROM presentations WHERE id = ?');
  stmt.run(id);
}

// Education
export function getAllEducation(): Education[] {
  const stmt = db.prepare('SELECT * FROM education ORDER BY display_order ASC');
  return stmt.all() as Education[];
}

export function getEducationById(id: number): Education | null {
  const stmt = db.prepare('SELECT * FROM education WHERE id = ?');
  return stmt.get(id) as Education | null;
}

export function createEducation(data: Omit<Education, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO education (degree, institution, location, duration, thesis, advisor, gpa, honors, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.degree, data.institution, data.location, data.duration, data.thesis,
    data.advisor, data.gpa, data.honors, data.display_order
  );
  return Number(result.lastInsertRowid);
}

export function updateEducation(id: number, data: Partial<Omit<Education, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE education SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deleteEducation(id: number): void {
  const stmt = db.prepare('DELETE FROM education WHERE id = ?');
  stmt.run(id);
}

// Awards
export function getAllAwards(): Award[] {
  const stmt = db.prepare('SELECT * FROM awards ORDER BY year DESC, display_order ASC');
  return stmt.all() as Award[];
}

export function getAwardById(id: number): Award | null {
  const stmt = db.prepare('SELECT * FROM awards WHERE id = ?');
  return stmt.get(id) as Award | null;
}

export function createAward(data: Omit<Award, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO awards (title, organization, year, description, display_order)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.title, data.organization, data.year, data.description, data.display_order
  );
  return Number(result.lastInsertRowid);
}

export function updateAward(id: number, data: Partial<Omit<Award, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE awards SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

export function deleteAward(id: number): void {
  const stmt = db.prepare('DELETE FROM awards WHERE id = ?');
  stmt.run(id);
}
