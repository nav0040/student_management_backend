import { StudentRepository } from '../repositories/student.repository';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';

export class StudentService {
  private repository: StudentRepository;

  constructor() {
    this.repository = new StudentRepository();
  }

  async createStudent(data: Prisma.StudentCreateInput) {
    return this.repository.create(data);
  }

  async getStudents(page: number, limit: number) {
    const { students, total } = await this.repository.findAllPaginated(page, limit);
    return {
      data: students,
      meta: {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async getStudentById(id: string) {
    const student = await this.repository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return student;
  }

  async updateStudent(id: string, data: Prisma.StudentUpdateInput) {
    const student = await this.repository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return this.repository.update(id, data);
  }

  async deleteStudent(id: string) {
    const student = await this.repository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return this.repository.delete(id);
  }

  async addMarkToStudent(studentId: string, subject: string, score: number) {
    const student = await this.repository.findById(studentId);
    if (!student) throw new AppError('Student not found', 404);
    return this.repository.addMark(studentId, { subject, score });
  }
}
