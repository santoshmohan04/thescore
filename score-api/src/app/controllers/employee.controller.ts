import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../schema/employee.schema';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() data: Partial<Employee>) {
    return this.employeeService.create(data);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Employee>) {
    return this.employeeService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
