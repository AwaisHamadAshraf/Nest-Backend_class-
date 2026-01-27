import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  getEmployeeHello() {
    return 'hellooooo';
  }

}
