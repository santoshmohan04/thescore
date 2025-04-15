import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from '../app/schema/employee.schema';
import { EmployeeService } from '../app/service/employee.service';
import { EmployeeController } from '../app/controllers/employee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}