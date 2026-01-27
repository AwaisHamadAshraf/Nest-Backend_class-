import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TodoModule } from './todo/todo.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [EmployeeModule, TodoModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
