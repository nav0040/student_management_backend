import { Request, Response } from 'express';
import { StudentService } from '../services/student.service';

const studentService = new StudentService();

export class StudentController {
  static async create(req: Request, res: Response) {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ status: 'success', data: student });
  }

  static async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await studentService.getStudents(page, limit);
    res.status(200).json({ status: 'success', ...result });
  }

  static async getById(req: Request, res: Response) {
    const student = await studentService.getStudentById(req.params.id as string);
    res.status(200).json({ status: 'success', data: student });
  }

  static async update(req: Request, res: Response) {
    const student = await studentService.updateStudent(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: student });
  }

  static async delete(req: Request, res: Response) {
    await studentService.deleteStudent(req.params.id as string);
    res.status(200).json({ status: 'success', message: 'Student deleted successfully' });
  }

  static async addMark(req: Request, res: Response) {
    const mark = await studentService.addMarkToStudent(req.params.id as string, req.body.subject, req.body.score);
    res.status(201).json({ status: 'success', data: mark });
  }
}
