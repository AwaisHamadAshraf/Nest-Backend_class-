import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
    getEmployee(){
        return 'hello from service'
    }
}
