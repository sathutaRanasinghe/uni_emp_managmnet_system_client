import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Employee } from '../../types';
import { INITIAL_EMPLOYEES, HARDCODED_DEPARTMENTS } from '../../data/mockData';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Search,
  UserCheck,
  Calendar,
  Award
} from 'lucide-react';
import EmployeeModal from '../modals/EmployeeModal';

const HRDashboard: React.FC = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      change: '+12%'
    },
    {
      title: 'Active Employees',
      value: employees.filter(emp => emp.status === 'active').length,
      icon: UserCheck,
      color: 'from-green-600 to-green-700',
      change: '+8%'
    },
    {
      title: 'Avg Salary',
      value: `Rs${Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length).toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-purple-600 to-purple-700',
      change: '+5%'
    },
    {
      title: 'Departments',
      value: HARDCODED_DEPARTMENTS.length,
      icon: Building2,
      color: 'from-indigo-600 to-indigo-700',
      change: '0%'
    }
  ];

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">Employee Management</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  setSelectedEmployee(null);
                  setIsEmployeeModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Hire Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Salary</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{employee.department}</td>
                  <td className="py-4 px-6 text-gray-600">{employee.position}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-medium">Rs{employee.salary.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEmployeeModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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

      {/* Department Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HARDCODED_DEPARTMENTS.map((dept) => {
          const deptEmployees = employees.filter(emp => emp.department === dept.name);
          const avgSalary = deptEmployees.length > 0 
            ? deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length 
            : 0;
          
          return (
            <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{dept.code}</span>
                </div>
                <Award className="h-5 w-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">{deptEmployees.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Salary:</span>
                  <span className="font-medium text-green-600">Rs{Math.round(avgSalary).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">Rs{dept.budget.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee Modal */}
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
    </div>
  );
};

export default HRDashboard;