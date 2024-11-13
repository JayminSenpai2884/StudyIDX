// This is a simple in-memory database for demo purposes
// In production, use a real database like PostgreSQL with Prisma

type Usage = {
  userId: string;
  count: number;
};

class Database {
  private usage: Map<string, Usage>;

  constructor() {
    this.usage = new Map();
  }

  usage = {
    findUnique: async ({ where: { userId } }: { where: { userId: string } }) => {
      return this.usage.get(userId) || null;
    },

    upsert: async ({
      where: { userId },
      update,
      create,
    }: {
      where: { userId: string };
      update: { count: { increment: number } };
      create: { userId: string; count: number };
    }) => {
      const existing = this.usage.get(userId);
      if (existing) {
        const updated = {
          ...existing,
          count: existing.count + update.count.increment,
        };
        this.usage.set(userId, updated);
        return updated;
      } else {
        this.usage.set(userId, create);
        return create;
      }
    },
  };
}

export const db = new Database();