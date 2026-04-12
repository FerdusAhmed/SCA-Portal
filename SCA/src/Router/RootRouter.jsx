import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/AuthPage/Login';
import Register from '../Pages/AuthPage/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import DashboardLayout from '../Layouts/DashboardLayout';
import Notice from '../Pages/Notice/Notice';
import Profile from '../Pages/Profile/Profile';
import NotFound from '../components/NotFound/NotFound';
import SCALoader from '../components/SCALoader/Nexusloader';
import ManageUsers from '../Pages/ManageUsers/ManageUsers';
import ViewNotice from '../Pages/Notice/ViewNotice';
import Attendance from '../Pages/Dashboard/Teacher/Attendance';
import AttendanceHistory from '../Pages/Dashboard/Teacher/AttendanceHistory';
import Assignment from '../Pages/TeacherPages/Assignment';
import MyAssignments from '../Pages/StudentPages/MyAssignments';
import ManageStudents from '../Pages/mangeStudent/ManageStudents';
import CreateRoutine from '../Pages/DynamicRoutine/CreateRoutine';
import ClassRoutine from '../Pages/DynamicRoutine/ClassRoutine';
import AdmissionForm from '../Pages/Admission/AdmissionForm';
import AdmissionApplication from '../Pages/AdminAdmissionCheck/AdmissionApplication';
import CreateResultSheet from '../Pages/PublishResultSheet/CreateResultSheet';
import ExamShedule from '../Pages/TeacherPages/ExamShedule';
import AllTeachers from '../Pages/BookingTeacher/AllTeachers';
import ManageMeetings from '../Pages/ManageMeetings/ManageMeetings';
import About from '../Pages/Home/About/About';
import Contact from '../components/Home/Contact';
import ResultSheet from '../Pages/PublishResultSheet/ResultSheet';
import StudentResult from '../Pages/PublishResultSheet/StudentResult';
import UpdateRoutine from '../Pages/DynamicRoutine/UpdateRoutine';
import MyExamSchedule from '../Pages/StudentPages/MyExamSchedule';
import MyCourse from '../Pages/MyCourse/MyCourse';
import StudentGiveResult from '../Pages/PublishResultSheet/StudentGiveResult';
import PrivateRoutes from './PrivetRoute/PrivateRoutes';
import AdminPrivetRoute from './PrivetRoute/AdminPrivetRoute';
import TeacherPrivRoute from './PrivetRoute/TeacherPrivRoute';
import StudentPrivRoute from './PrivetRoute/StudentPrivRoute';
import MyPayments from '../Pages/StudentPages/MyPayments';
import PaymentSuccess from '../Pages/AdminPages/PaymentSuccess';
import PaymentCancel from '../Pages/AdminPages/PaymentCancel';
import CreatePayment from '../Pages/AdminPages/Payments';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    // errorElement: <NotFound></NotFound>,
    hydrateFallbackElement: <SCALoader></SCALoader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/admission',
        Component: AdmissionForm,
      },
      {
        path: '/booking-teachers',
        Component: AllTeachers,
      },
      {
        path: '/manage-meetings',
        Component: ManageMeetings,
      },
      {
        path: '/result',
        Component: ResultSheet,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'contact',
        Component: Contact,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/noticepost',
        Component: Notice,
      },
      {
        path: '/dashboard/profile',
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/manage-users',
        element: (
          <PrivateRoutes>
            <ManageUsers></ManageUsers>
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/admissions',
        element: <AdmissionApplication></AdmissionApplication>,
      },
      {
        path: '/dashboard/notices',
        Component: ViewNotice,
      },
      {
        path: '/dashboard/teachersh/Attendance',
        element: <Attendance></Attendance>,
      },
      {
        path: '/dashboard/teachersh/AttendanceHistory',
        element: <AttendanceHistory></AttendanceHistory>,
      },
      {
        path: '/dashboard/assignments',
        Component: Assignment,
      },
      {
        path: '/dashboard/my-assignments',
        Component: MyAssignments,
      },
      {
        path: '/dashboard/manage-student',
        element: (
          <TeacherPrivRoute>
            <ManageStudents></ManageStudents>
          </TeacherPrivRoute>
        ),
      },
      {
        path: '/dashboard/exam-schedule',
        Component: ExamShedule,
      },
      {
        path: '/dashboard/create-routine',
        element: (
          <AdminPrivetRoute>
            <CreateRoutine></CreateRoutine>
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/class-routine',
        element: (
          <StudentPrivRoute>
            <ClassRoutine></ClassRoutine>
          </StudentPrivRoute>
        ),
      },

      {
        path: '/dashboard/student-give-result',
        element: (
          <AdminPrivetRoute>
            <StudentGiveResult></StudentGiveResult>
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/student-give-result/:id',
        element: (
          <AdminPrivetRoute>
            <CreateResultSheet></CreateResultSheet>
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/student-result',
        element: (
          <StudentPrivRoute>
            <StudentResult></StudentResult>
          </StudentPrivRoute>
        ),
      },

      {
        path: '/dashboard/check-routine',
        element: (
          <AdminPrivetRoute>
            <UpdateRoutine></UpdateRoutine>
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/my-exam-schedule',
        Component: MyExamSchedule,
      },
      {
        path: '/dashboard/my-courses',
        Component: MyCourse,
      },
      {
        path: '/dashboard/payments',
        Component: CreatePayment,
      },
      {
        path: '/dashboard/my-payments',
        Component: MyPayments,
      },
      {
        path: '/dashboard/payment-success',
        Component: PaymentSuccess,
      },
      {
        path: '/dashboard/payment-cancel',
        Component: PaymentCancel,
      },
      {
        path: '/dashboard/school-notices',
        element: <StudentPrivRoute>
         <ViewNotice></ViewNotice>
        </StudentPrivRoute>,
      },
    ],
  },
]);

export default router;
