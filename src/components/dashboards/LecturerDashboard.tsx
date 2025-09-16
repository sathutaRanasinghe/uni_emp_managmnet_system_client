import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Student } from '../../types';
import { INITIAL_STUDENTS, HARDCODED_DEPARTMENTS } from '../../data/mockData';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  Award,
  Clock,
  TrendingUp,
  User
} from 'lucide-react';

const LecturerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students] = useLocalStorage<Student[]>('students', INITIAL_STUDENTS);

  // Mock data for lecturer's classes and schedule
  const myClasses = [
    {
      id: '1',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      students: 45,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Lab 101'
    },
    {
      id: '2',
      name: 'Data Structures',
      code: 'CS201',
      students: 32,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Room 205'
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS301',
      students: 28,
      schedule: 'Mon, Wed - 4:00 PM',
      room: 'Room 301'
    }
  ];

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Introduction to CS', room: 'Lab 101', type: 'lecture' },
    { time: '11:00 AM', subject: 'Office Hours', room: 'Office 205', type: 'office' },
    { time: '02:00 PM', subject: 'Data Structures', room: 'Room 205', type: 'lecture' },
    { time: '04:00 PM', subject: 'Faculty Meeting', room: 'Conference Room', type: 'meeting' }
  ];

  const stats = [
    {
      title: 'My Classes',
      value: myClasses.length,
      icon: BookOpen,
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'Total Students',
      value: myClasses.reduce((sum, cls) => sum + cls.students, 0),
      icon: Users,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Avg Class Size',
      value: Math.round(myClasses.reduce((sum, cls) => sum + cls.students, 0) / myClasses.length),
      icon: GraduationCap,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: "Today's Classes",
      value: todaySchedule.filter(item => item.type === 'lecture').length,
      icon: Calendar,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'office':
        return 'bg-green-100 text-green-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lecturer Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
        <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
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
                <p className="text-2xl font-bold text-green-600">{stat.value}</p>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-500 min-w-[80px]">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.subject}</div>
                    <div className="text-sm text-gray-500">{item.room}</div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Classes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Classes</h2>
              <BookOpen className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myClasses.map((cls) => (
                <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{cls.code.slice(-2)}</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {cls.students} students
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{cls.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{cls.code}</p>
                  <p className="text-sm text-gray-500 mb-2">{cls.schedule}</p>
                  <p className="text-sm text-gray-500">{cls.room}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students Performance */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Student Performance Overview</h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Year</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">GPA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{student.studentId}</td>
                  <td className="py-3 px-4 text-gray-600">{student.department}</td>
                  <td className="py-3 px-4 text-gray-600">Year {student.year}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className={`font-semibold ${
                        student.gpa >= 3.5 ? 'text-green-600' : 
                        student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {student.gpa.toFixed(1)}
                      </span>
                      <Award className="h-4 w-4 ml-1 text-gray-400" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;