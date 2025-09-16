export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'hr' | 'lecturer' | 'student';
  name: string;
  email: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: number;
  gpa: number;
  enrollmentDate: string;
  status: 'enrolled' | 'graduated' | 'suspended';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  budget: number;
  employeeCount: number;
}