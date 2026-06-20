import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class StudentRepository {
  async create(data: Prisma.StudentCreateInput) {
    return prisma.student.create({ data });
  }

  async findAllPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count(),
    ]);
    return { students, total };
  }

  async findById(id: string) {
    return prisma.student.findUnique({
      where: { id },
      include: { marks: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.student.delete({
      where: { id },
    });
  }

  async addMark(studentId: string, data: Prisma.MarkCreateWithoutStudentInput) {
    return prisma.mark.create({
      data: {
        ...data,
        student: { connect: { id: studentId } },
      },
    });
  }
}
