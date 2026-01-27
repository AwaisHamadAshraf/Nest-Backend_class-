import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

export type Student = {
  name: string;
  rollNo: string;
  project?: string;
};

@Injectable()
export class StudentService {
  private students: Record<string, Student> = {};

  constructor() {
    // seed mock data as requested
    const mock: Student = { name: 'awais', rollNo: '032', project: 'kids learning app' };
    this.students[mock.rollNo] = mock;
  }

  getAll(): Student[] {
    return Object.values(this.students);
  }

  getByRoll(rollNo: string): Student {
    const s = this.students[rollNo];
    if (!s) throw new NotFoundException(`Student with rollNo ${rollNo} not found`);
    return s;
  }

  create(dto: CreateStudentDto): Student {
    if (!dto || !dto.rollNo || !dto.name) {
      throw new BadRequestException('Request body must include `name` and `rollNo`.');
    }
    if (this.students[dto.rollNo]) throw new ConflictException(`Student with rollNo ${dto.rollNo} already exists`);
    const student: Student = { name: dto.name, rollNo: dto.rollNo, project: dto.project };
    this.students[dto.rollNo] = student;
    return student;
  }

  update(rollNo: string, dto: Partial<CreateStudentDto>): Student {
    const existing = this.students[rollNo];
    if (!existing) throw new NotFoundException(`Student with rollNo ${rollNo} not found`);
    const updated: Student = {
      ...existing,
      name: dto.name ?? existing.name,
      project: dto.project ?? existing.project,
      // rollNo should not be changed; ignore dto.rollNo if provided
    };
    this.students[rollNo] = updated;
    return updated;
  }

  delete(rollNo: string): { deleted: boolean } {
    const existing = this.students[rollNo];
    if (!existing) throw new NotFoundException(`Student with rollNo ${rollNo} not found`);
    delete this.students[rollNo];
    return { deleted: true };
  }
}
