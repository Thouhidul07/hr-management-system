const { initDatabase } = require('../config/db');

async function main() {
  console.log('Initializing MySQL schema and seeding default data...');
  await initDatabase();
  console.log('Database seeded successfully!');
  console.log('Created users:');
  console.log('- Admin: admin@hrms.com / password123');
  console.log('- HR: hr@hrms.com / password123');
  console.log('- Manager: manager@hrms.com / password123');
  console.log('- Employee: employee@hrms.com / password123');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
