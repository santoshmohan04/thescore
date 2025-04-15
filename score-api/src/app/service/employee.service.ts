import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../schema/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(data: Partial<Employee>): Promise<Employee> {
    const newEmployee = new this.employeeModel(data);
    return newEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findOne({ id }).exec(); // Search by custom "id"
  }

  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    return this.employeeModel
      .findOneAndUpdate({ id }, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Employee> {
    return this.employeeModel.findOneAndDelete({ id }).exec();
  }
}