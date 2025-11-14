// This script initializes and seeds the database
// Run with: node scripts/setup-db.js

const { initializeDatabase, seedDatabase } = require('../lib/init-db.ts');

console.log('Setting up database...');

try {
  initializeDatabase();
  seedDatabase();
  console.log('✅ Database setup complete!');
} catch (error) {
  console.error('❌ Error setting up database:', error);
  process.exit(1);
}
