import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({
  timestamps: { createdAt: 'created_time', updatedAt: 'updated_time' },
  collection: 'employeesdata',
})
export class Employee {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  employee_name: string;

  @Prop()
  employee_age: number;

  @Prop()
  employee_salary: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  contactNumber: string;

  @Prop()
  age: number;

  @Prop()
  dob: string;

  @Prop()
  salary: number;

  @Prop()
  address: string;

  @Prop()
  S_No: number;

  @Prop()
  surname: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
