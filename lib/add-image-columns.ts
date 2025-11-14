import db from './db';

export function addImageColumns() {
  const tables = [
    'posts',
    'publications',
    'research_projects',
    'presentations',
    'education',
    'awards'
  ];

  const defaultLayouts: Record<string, string> = {
    posts: 'full',
    publications: 'medium',
    research_projects: 'medium',
    presentations: 'small',
    education: 'small',
    awards: 'small'
  };

  tables.forEach(table => {
    try {
      // Add image_url column
      db.exec(`ALTER TABLE ${table} ADD COLUMN image_url TEXT`);
      console.log(`Added image_url column to ${table} table`);
    } catch (error: any) {
      if (error.message.includes('duplicate column name')) {
        console.log(`image_url column already exists in ${table} table`);
      } else {
        console.error(`Error adding image_url to ${table}:`, error);
      }
    }

    try {
      // Add image_layout column
      db.exec(`ALTER TABLE ${table} ADD COLUMN image_layout TEXT DEFAULT '${defaultLayouts[table]}'`);
      console.log(`Added image_layout column to ${table} table`);
    } catch (error: any) {
      if (error.message.includes('duplicate column name')) {
        console.log(`image_layout column already exists in ${table} table`);
      } else {
        console.error(`Error adding image_layout to ${table}:`, error);
      }
    }
  });

  console.log('Image columns migration complete!');
}

// Run migration if this file is executed directly
if (require.main === module) {
  addImageColumns();
  process.exit(0);
}
