import { User, Employee, Student, Department } from '../types';

export const HARDCODED_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Perera Arachchige Don Nimal Ranjith Perera',
    email: 'admin@university.lk'
  },
  {
    id: '2',
    username: 'hr',
    password: 'hr123',
    role: 'hr',
    name: 'Fernando Mudiyanselage Sanduni Nadeesha Fernando',
    email: 'hr@university.lk'
  },
  {
    id: '3',
    username: 'lecturer',
    password: 'lecturer123',
    role: 'lecturer',
    name: 'Wijesinghe Mudiyanselage Dr. Ruwan Chathuranga Wijesinghe',
    email: 'ruwan.wijesinghe@university.lk'
  },
  {
    id: '4',
    username: 'student',
    password: 'student123',
    role: 'student',
    name: 'Appuhamilage Dinusha Tharushi Kumari',
    email: 'dinusha.kumari@student.university.lk'
  }
];

export const HARDCODED_DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    head: 'Senanayake Mudiyanselage Malith Prasanna Senanayake',
    budget: 500000,
    employeeCount: 25
  },
  {
    id: '2',
    name: 'Business Administration',
    code: 'BA',
    head: 'Gunawardena Mudiyanselage Harsha Pradeep Gunawardena',
    budget: 350000,
    employeeCount: 18
  },
  {
    id: '3',
    name: 'Engineering',
    code: 'ENG',
    head: 'Karunaratne Mudiyanselage Sampath Priyantha Karunaratne',
    budget: 750000,
    employeeCount: 35
  },
  {
    id: '4',
    name: 'Mathematics',
    code: 'MATH',
    head: 'Abeysekera Mudiyanselage Anjali Nirmala Abeysekera',
    budget: 300000,
    employeeCount: 15
  },
  {
    id: '5',
    name: 'Marketing',
    code: 'MKT',
    head: 'Rathnayake Mudiyanselage Pradeep Kumara Rathnayake',
    budget: 280000,
    employeeCount: 12
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Prof. Senanayake Mudiyanselage Malith Prasanna Senanayake',
    email: 'malith.senanayake@university.lk',
    phone: '+94-77-1000101',
    department: 'Computer Science',
    position: 'Department Head',
    salary: 95000,
    hireDate: '2015-08-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Gunawardena Mudiyanselage Harsha Pradeep Gunawardena',
    email: 'harsha.gunawardena@university.lk',
    phone: '+94-77-1000102',
    department: 'Business Administration',
    position: 'Professor',
    salary: 85000,
    hireDate: '2017-01-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Ruwan Chathuranga Wijesinghe',
    email: 'ruwan.wijesinghe@university.lk',
    phone: '+94-77-1000103',
    department: 'Computer Science',
    position: 'Associate Professor',
    salary: 75000,
    hireDate: '2019-03-10',
    status: 'active'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Appuhamilage Dinusha Tharushi Kumari',
    email: 'dinusha.kumari@student.university.lk',
    phone: '+94-77-2000201',
    studentId: 'STU2021001',
    department: 'Computer Science',
    year: 3,
    gpa: 3.8,
    enrollmentDate: '2021-09-01',
    status: 'enrolled'
  },
  {
    id: '2',
    name: 'Silva Arachchige Roshan Maduranga Silva',
    email: 'roshan.silva@student.university.lk',
    phone: '+94-77-2000202',
    studentId: 'STU2022002',
    department: 'Business Administration',
    year: 2,
    gpa: 3.5,
    enrollmentDate: '2022-09-01',
    status: 'enrolled'
  },
  {
    id: '3',
    name: 'Jayasinghe Mudiyanselage Tharindu Lakshan Jayasinghe',
    email: 'tharindu.jayasinghe@student.university.lk',
    phone: '+94-77-2000203',
    studentId: 'STU2020003',
    department: 'Engineering',
    year: 4,
    gpa: 3.9,
    enrollmentDate: '2020-09-01',
    status: 'enrolled'
  }
];
