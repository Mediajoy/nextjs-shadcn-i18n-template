import { PrismaClient } from '@prisma/client';

// Use a singleton pattern to prevent multiple instances during hot reloads in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a singleton instance of PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Only attach the prisma instance to the global object in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Connect to the database
 * This is useful for serverless environments to warm up the connection
 */
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    return { success: true };
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return { success: false, error };
  }
}

/**
 * Disconnect from the database
 * This is useful for serverless environments to clean up connections
 */
export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
    return { success: true };
  } catch (error) {
    console.error('Failed to disconnect from database:', error);
    return { success: false, error };
  }
}
