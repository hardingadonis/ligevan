import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import '@/assets/styles/global.css';

import ProtectedRoute from './components/commons/ProtectedRoute';
import StudentProfile from './pages/student/Profile';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));

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
							<ProtectedRoute redirectPath="/student/login" tokenName="token">
								<StudentProfile />
							</ProtectedRoute>
						}
					/>
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
