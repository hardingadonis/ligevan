import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/admin/ProtectedRoute';

// Import the ProtectedRoute

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
					<Route path="/student" element={<HomepageStudent />} />
					<Route path="/admin/login" element={<AdminLogin />} />

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
