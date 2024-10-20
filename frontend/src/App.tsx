import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import '@/assets/styles/global.css';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

import ProtectedRoute from './components/commons/ProtectedRoute';
import StudentProfile from './pages/student/Profile';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const ClassesPage = lazy(() => import('@/pages/teacher/Classes'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminCoursesManagement = lazy(
	() => import('@/pages/admin/CoursesManagement'),
);
const LoginTeacher = lazy(() => import('@/pages/teacher/Login'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));

const AdminCentersManagement = lazy(
	() => import('@/pages/admin/CentersManagement'),
);

const App: React.FC = () => {
	return (
		<Router>
			<Suspense
				fallback={
					<div>
						<Spin size="large" /> Đang tải...
					</div>
				}
			>
				<Routes>
					<Route index element={<Navigate to="/student" replace />} />
					<Route path="/student" element={<HomepageStudent />} />
					<Route path="/student/login" element={<HomepageStudent />} />
					<Route
						path="/student/profile"
						element={
							<ProtectedRoute redirectPath="/student" tokenName="token">
								<StudentProfile />
							</ProtectedRoute>
						}
					/>
					<Route path="/teacher/login" element={<LoginTeacher />} />
					<Route path="/teacher/classes" element={<ClassesPage />} />
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/admin/centers" element={<AdminCentersManagement />} />
					<Route path="/admin/courses" element={<AdminCoursesManagement />} />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin"
						element={<Navigate replace to="/admin/dashboard" />}
					/>

					<Route
						path="/admin/dashboard"
						element={
							<ProtectedRoute>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
