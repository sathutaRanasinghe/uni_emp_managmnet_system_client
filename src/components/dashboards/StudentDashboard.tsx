import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Student } from '../../types';
import { INITIAL_STUDENTS, HARDCODED_DEPARTMENTS } from '../../data/mockData';
import { 
  BookOpen, 
  Calendar,
  Award, 
  Clock,
  TrendingUp,
  User,
  FileText,
  Bell,
  Target
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students] = useLocalStorage<Student[]>('students', INITIAL_STUDENTS);
  
  // Find current student data
  const currentStudent = students.find(s => s.email === user?.email) || students[0];

  // Mock data for student's courses and assignments
  const myCourses = [
    {
      id: '1',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      instructor: 'Dr. Michael Smith',
      credits: 3,
      grade: 'A-',
      progress: 85
    },
    {
      id: '2',
      name: 'Calculus I',
      code: 'MATH101',
      instructor: 'Prof. Anna Taylor',
      credits: 4,
      grade: 'B+',
      progress: 78
    },
    {
      id: '3',
      name: 'English Composition',
      code: 'ENG101',
      instructor: 'Dr. Sarah Johnson',
      credits: 3,
      grade: 'A',
      progress: 92
    },
    {
      id: '4',
      name: 'Physics I',
      code: 'PHY101',
      instructor: 'Dr. Robert Davis',
      credits: 4,
      grade: 'B',
      progress: 72
    }
  ];

  const upcomingAssignments = [
    {
      id: '1',
      title: 'Programming Assignment 3',
      course: 'CS101',
      dueDate: '2025-01-25',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Calculus Homework 5',
      course: 'MATH101',
      dueDate: '2025-01-27',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Essay: Modern Literature',
      course: 'ENG101',
      dueDate: '2025-01-30',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Lab Report 2',
      course: 'PHY101',
      dueDate: '2025-02-02',
      status: 'pending'
    }
  ];

  const schedule = [
    { time: '09:00 AM', course: 'CS101', room: 'Lab 101', type: 'lecture' },
    { time: '11:00 AM', course: 'MATH101', room: 'Room 205', type: 'lecture' },
    { time: '02:00 PM', course: 'ENG101', room: 'Room 301', type: 'seminar' },
    { time: '04:00 PM', course: 'PHY101', room: 'Lab 201', type: 'lab' }
  ];

  const totalCredits = myCourses.reduce((sum, course) => sum + course.credits, 0);
  const averageProgress = Math.round(myCourses.reduce((sum, course) => sum + course.progress, 0) / myCourses.length);

  const stats = [
    {
      title: 'Current GPA',
      value: currentStudent?.gpa.toFixed(2) || '3.80',
      icon: Award,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'Total Credits',
      value: totalCredits,
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Course Progress',
      value: `${averageProgress}%`,
      icon: TrendingUp,
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'Year',
      value: currentStudent?.year || 3,
      icon: Calendar,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-green-100 text-green-800';
      case 'seminar':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {currentStudent?.name}</p>
        <p className="text-sm text-gray-500">
          {currentStudent?.department} - Student ID: {currentStudent?.studentId}
        </p>
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
                <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-500 min-w-[80px]">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.course}</div>
                    <div className="text-sm text-gray-500">{item.room}</div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Assignments</h2>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingAssignments.slice(0, 4).map((assignment) => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                return (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{assignment.title}</h4>
                        <p className="text-xs text-gray-600">{assignment.course}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-2 text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                        <p className={`text-xs mt-1 ${daysUntilDue <= 2 ? 'text-red-600' : 'text-gray-500'}`}>
                          {daysUntilDue > 0 ? `${daysUntilDue} days` : 'Overdue'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              <BookOpen className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{course.code.slice(0, 2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-purple-600">{course.grade}</span>
                      <p className="text-xs text-gray-500">{course.credits} credits</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{course.code}</p>
                  <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{course.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;