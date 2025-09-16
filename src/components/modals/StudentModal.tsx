import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { HARDCODED_DEPARTMENTS } from '../../data/mockData';
import { X } from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSave: (student: Student) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
}) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    year: 1,
    gpa: 0,
    enrollmentDate: '',
    status: 'enrolled',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        studentId: student.studentId,
        department: student.department,
        year: student.year,
        gpa: student.gpa,
        enrollmentDate: student.enrollmentDate,
        status: student.status,
      });
    } else {
      // Generate a new student ID
      const currentYear = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const newStudentId = `STU${currentYear}${randomNum}`;
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentId: newStudentId,
        department: HARDCODED_DEPARTMENTS[0].name,
        year: 1,
        gpa: 0,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'enrolled',
      });
    }
  }, [student, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studentData: Student = {
      id: student?.id || Date.now().toString(),
      ...formData,
    };

    onSave(studentData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? Number(value) : 
              name === 'gpa' ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID *
            </label>
            <input
              type="text"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
              placeholder="Enter student ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {HARDCODED_DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <select
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GPA *
            </label>
            <input
              type="number"
              name="gpa"
              required
              min="0"
              max="4"
              step="0.1"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter GPA (0.0 - 4.0)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enrollment Date *
            </label>
            <input
              type="date"
              name="enrollmentDate"
              required
              value={formData.enrollmentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="enrolled">Enrolled</option>
              <option value="graduated">Graduated</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {student ? 'Update' : 'Add'} Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;