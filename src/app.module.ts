import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [EmployeeModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
