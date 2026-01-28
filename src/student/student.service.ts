import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.student.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getByRoll(rollNo: number) {
    const student = await this.prisma.student.findUnique({
      where: { rollNo },
    });

    if (!student) {
      throw new NotFoundException(`Student with rollNo ${rollNo} not found`);
    }

    return student;
  }

  async create(dto: CreateStudentDto) {
    const existing = await this.prisma.student.findUnique({
      where: { rollNo: dto.rollNo },
    });

    if (existing) {
      throw new ConflictException(
        `Student with rollNo ${dto.rollNo} already exists`,
      );
    }

    try {
      return await this.prisma.student.create({
        data: {
          name: dto.name,
          rollNo: dto.rollNo,
          project: dto.project,
        },
      });
    } catch (error) {
      throw new ConflictException(
        `Student with rollNo ${dto.rollNo} already exists`,
      );
    }
  }

  async update(rollNo: number, dto: Partial<CreateStudentDto>) {
    await this.getByRoll(rollNo);

    return this.prisma.student.update({
      where: { rollNo },
      data: {
        name: dto.name,
        project: dto.project,
      },
    });
  }

  async delete(rollNo: number) {
    await this.getByRoll(rollNo);

    await this.prisma.student.delete({
      where: { rollNo },
    });

    return { deleted: true };
  }
}
