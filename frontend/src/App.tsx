import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import ProtectedRoute from '@/components/commons/ProtectedRoute';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const StudentProfile = lazy(() => import('@/pages/student/Profile'));
const EditProfileStudent = lazy(() => import('@/pages/student/EditProfile'));
const ClassesPage = lazy(() => import('@/pages/teacher/Classes'));
const ClassDetail = lazy(() => import('@/pages/teacher/ClassDetail'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminCoursesManagement = lazy(
	() => import('@/pages/admin/CoursesManagement'),
);
const AdminVouchersManagement = lazy(
	() => import('@/pages/admin/VouchersManagement'),
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
					<Route
						path="/student/profile/edit"
						element={
							<ProtectedRoute redirectPath="/student" tokenName="token">
								<EditProfileStudent />
							</ProtectedRoute>
						}
					/>
					<Route path="/teacher/login" element={<LoginTeacher />} />
					<Route path="/teacher/classes" element={<ClassesPage />} />
					<Route path="/teacher/classes/:id" element={<ClassDetail />} />
					<Route
						path="/teacher"
						element={<Navigate to="/teacher/classes" replace />}
					/>
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin/centers"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminCentersManagement />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/courses"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminCoursesManagement />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/vouchers"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminVouchersManagement />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin"
						element={<Navigate replace to="/admin/dashboard" />}
					/>

					<Route
						path="/admin/dashboard"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
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
