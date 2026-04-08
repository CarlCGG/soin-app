import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'alice@test.com' },
    update: {},
    create: { email: 'alice@test.com', username: 'alice', password: hash },
  });

  await prisma.user.upsert({
    where: { email: 'bob@test.com' },
    update: {},
    create: { email: 'bob@test.com', username: 'bob', password: hash },
  });

  console.log('✅ Done! alice@test.com / bob@test.com, password: password123');
  await prisma.$disconnect();
}

main();