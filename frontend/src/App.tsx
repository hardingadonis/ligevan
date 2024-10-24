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
const StudentClassList = lazy(() => import('@/pages/student/ClassList'));
const StudentCourseDetail = lazy(() => import('@/pages/student/CourseDetail'));
const ClassesPage = lazy(() => import('@/pages/teacher/Classes'));
const ClassDetail = lazy(() => import('@/pages/teacher/ClassDetail'));

const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminCoursesManagement = lazy(
	() => import('@/pages/admin/CoursesManagement'),
);
const AdminVouchersManagement = lazy(
	() => import('@/pages/admin/VouchersManagement'),
);
const AdminVoucherDetail = lazy(() => import('@/pages/admin/VoucherDetail'));
const LoginTeacher = lazy(() => import('@/pages/teacher/Login'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminCenterCreate = lazy(() => import('@/pages/admin/CenterCreate'));
const AdminCourseCreate = lazy(() => import('@/pages/admin/CourseCreate'));
const AdminCentersManagement = lazy(
	() => import('@/pages/admin/CentersManagement'),
);
const AdminCenterEdit = lazy(() => import('@/pages/admin/CenterEdit'));

const CourseDetail = lazy(() => import('@/pages/admin/CourseDetail'));
const CenterDetail = lazy(() => import('@/pages/admin/CenterDetail'));

const CourseDetailCenter = lazy(() => import('@/pages/admin/ListCourseCenter'));

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
						path="/student/courses/:courseID/:centerID"
						element={<StudentCourseDetail />}
					/>
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
					<Route
						path="/student/classes"
						element={
							<ProtectedRoute redirectPath="/student" tokenName="token">
								<StudentClassList />
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
						path="/admin/centers/:id"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<CenterDetail />
							</ProtectedRoute>
						}
					/>

					{/* ------------------ */}
					<Route
						path="/admin/centers/:id/courses"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<CourseDetailCenter />
							</ProtectedRoute>
						}
					/>
					{/* ------------------ */}

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
						path="/admin/vouchers/:id"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminVoucherDetail />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/centers/create"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminCenterCreate />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/courses/create"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminCourseCreate />
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
					<Route
						path="/admin/courses/:id"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<CourseDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/centers/edit/:id"
						element={
							<ProtectedRoute
								redirectPath="/admin/login"
								tokenName="accessToken"
							>
								<AdminCenterEdit />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
