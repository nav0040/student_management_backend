import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createStudentSchema, updateStudentSchema, paginationQuerySchema, createMarkSchema } from '../validators/student.validator';

const router = Router();

router.post('/', validateRequest(createStudentSchema), StudentController.create);
router.get('/', validateRequest(paginationQuerySchema), StudentController.getAll);
router.get('/:id', StudentController.getById);
router.put('/:id', validateRequest(updateStudentSchema), StudentController.update);
router.delete('/:id', StudentController.delete);

router.post('/:id/marks', validateRequest(createMarkSchema), StudentController.addMark);

export default router;
