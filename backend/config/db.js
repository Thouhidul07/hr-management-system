const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

module.exports = { prisma, testConnection };