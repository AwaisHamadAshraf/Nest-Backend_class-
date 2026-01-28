import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly svc: StudentService) {}

  @Get()
  getAll() {
    return this.svc.getAll();
  }

  @Get(':rollNo')
  getByRoll(@Param('rollNo') rollNo: string) {
    return this.svc.getByRoll(Number(rollNo));
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.svc.create(dto);
  }

  @Patch(':rollNo')
  update(
    @Param('rollNo') rollNo: string,
    @Body() dto: Partial<CreateStudentDto>,
  ) {
    return this.svc.update(Number(rollNo), dto);
  }

  @Delete(':rollNo')
  delete(@Param('rollNo') rollNo: string) {
    return this.svc.delete(Number(rollNo));
  }
}
