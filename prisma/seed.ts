import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean up existing data to prevent duplicates on multiple runs
  await prisma.mark.deleteMany({});
  await prisma.student.deleteMany({});

  const student1 = await prisma.student.create({
    data: {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      marks: {
        create: [
          { subject: 'Mathematics', score: 95 },
          { subject: 'Science', score: 88 },
          { subject: 'History', score: 92 },
        ],
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob.jones@example.com',
      marks: {
        create: [
          { subject: 'Mathematics', score: 75 },
          { subject: 'English', score: 82 },
        ],
      },
    },
  });

  // Create some extra students for pagination testing
  for (let i = 1; i <= 25; i++) {
    await prisma.student.create({
      data: {
        firstName: `Student${i}`,
        lastName: `Demo`,
        email: `student${i}.demo@example.com`,
      }
    })
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
