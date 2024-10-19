import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const HomePageTeacher = lazy(() => import('@/pages/teacher/Homepage'));
const ClassesPage = lazy(() => import('@/pages/teacher/Classes'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const LoginTeacher = lazy(() => import('@/pages/teacher/Login'));

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
					<Route path="/student" element={<HomepageStudent />} />
					<Route path="/teacher" element={<HomePageTeacher />} />
					<Route path="/teacher/login" element={<LoginTeacher />} />
					<Route path="/teacher/classes" element={<ClassesPage />} />
					<Route path="/teacher/classes" element={<ClassesPage />} />
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
