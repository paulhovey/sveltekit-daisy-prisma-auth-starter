import { PrismaClient } from '@prisma/client';

const prismaInstance = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export default prismaInstance;
