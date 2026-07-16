// Mock Prisma for Vercel deployment - uses in-memory data

export const prisma = {
  // Mock methods that return empty arrays/objects
  // This allows the app to deploy without database
  user: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async (data: any) => data,
  },
  favoriteTeam: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    delete: async (data: any) => data,
  },
  favoritePlayer: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    delete: async (data: any) => data,
  },
};
