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

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));

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
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin"
						element={<Navigate replace to="/admin/login" />}
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
