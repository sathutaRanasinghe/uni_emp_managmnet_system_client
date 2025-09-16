import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Employee, Student, Department } from '../../types';
import { INITIAL_EMPLOYEES, INITIAL_STUDENTS, HARDCODED_DEPARTMENTS } from '../../data/mockData';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  BarChart3,
  DollarSign
} from 'lucide-react';
import EmployeeModal from '../modals/EmployeeModal';
import StudentModal from '../modals/StudentModal';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', INITIAL_EMPLOYEES);
  const [students, setStudents] = useLocalStorage<Student[]>('students', INITIAL_STUDENTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'students' | 'departments'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Students',
      value: students.length,
      icon: GraduationCap,
      color: 'from-green-600 to-green-700',
      textColor: 'text-green-600'
    },
    {
      title: 'Departments',
      value: HARDCODED_DEPARTMENTS.length,
      icon: Building2,
      color: 'from-purple-600 to-purple-700',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Budget',
      value: `Rs${HARDCODED_DEPARTMENTS.reduce((sum, dept) => sum + dept.budget, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-indigo-600 to-indigo-700',
      textColor: 'text-indigo-600'
    }
  ];

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(std => std.id !== id));
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(std =>
    std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    std.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    std.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'departments', label: 'Departments', icon: Building2 }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Head</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Employees</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {HARDCODED_DEPARTMENTS.map((dept) => (
                    <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">{dept.code}</span>
                          </div>
                          {dept.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{dept.head}</td>
                      <td className="py-3 px-4 text-gray-600">{dept.employeeCount}</td>
                      <td className="py-3 px-4 text-gray-600">Rs{dept.budget.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedEmployee(null);
                setIsEmployeeModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Salary</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                      <td className="py-3 px-4 text-gray-600">{employee.position}</td>
                      <td className="py-3 px-4 text-gray-600">Rs{employee.salary.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsEmployeeModalOpen(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStudent(null);
                setIsStudentModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Student ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Year</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">GPA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{student.studentId}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{student.department}</td>
                      <td className="py-3 px-4 text-gray-600">Year {student.year}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${
                          student.gpa >= 3.5 ? 'text-green-600' : 
                          student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {student.gpa.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'enrolled' ? 'bg-green-100 text-green-800' :
                          student.status === 'graduated' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsStudentModalOpen(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Departments Tab */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HARDCODED_DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{dept.code}</span>
                  </div>
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-sm text-gray-600 mb-4">Head: {dept.head}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium">{dept.employeeCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium text-green-600">Rs{dept.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => {
          setIsEmployeeModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={(employee) => {
          if (selectedEmployee) {
            setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
          } else {
            const newEmployee = { ...employee, id: Date.now().toString() };
            setEmployees([...employees, newEmployee]);
          }
          setIsEmployeeModalOpen(false);
          setSelectedEmployee(null);
        }}
      />

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={(student) => {
          if (selectedStudent) {
            setStudents(students.map(std => std.id === student.id ? student : std));
          } else {
            const newStudent = { ...student, id: Date.now().toString() };
            setStudents([...students, newStudent]);
          }
          setIsStudentModalOpen(false);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
};

export default AdminDashboard;