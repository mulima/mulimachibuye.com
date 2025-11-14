import db from './db';

export function addArchivedColumns() {
  try {
    // Add archived column to posts table
    db.exec('ALTER TABLE posts ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to posts table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in posts table');
    } else {
      console.error('Error adding archived to posts:', error);
    }
  }

  try {
    // Add archived column to publications table
    db.exec('ALTER TABLE publications ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to publications table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in publications table');
    } else {
      console.error('Error adding archived to publications:', error);
    }
  }

  try {
    // Add archived column to education table
    db.exec('ALTER TABLE education ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to education table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in education table');
    } else {
      console.error('Error adding archived to education:', error);
    }
  }

  try {
    // Add archived column to research_projects table
    db.exec('ALTER TABLE research_projects ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to research_projects table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in research_projects table');
    } else {
      console.error('Error adding archived to research_projects:', error);
    }
  }

  try {
    // Add archived column to presentations table
    db.exec('ALTER TABLE presentations ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to presentations table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in presentations table');
    } else {
      console.error('Error adding archived to presentations:', error);
    }
  }

  try {
    // Add archived column to awards table
    db.exec('ALTER TABLE awards ADD COLUMN archived BOOLEAN DEFAULT 0');
    console.log('Added archived column to awards table');
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log('archived column already exists in awards table');
    } else {
      console.error('Error adding archived to awards:', error);
    }
  }

  console.log('Archive columns migration complete!');
}

// Run migration if this file is executed directly
if (require.main === module) {
  addArchivedColumns();
  process.exit(0);
}
