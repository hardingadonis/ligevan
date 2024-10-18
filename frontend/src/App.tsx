import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));

const AdminCentersManagement = lazy(() => import('@/pages/admin/CentersManagement'));

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
					<Route path="/admin/dashboard" element={<AdminDashboard />} />

					<Route path="/admin/centers" element={<AdminCentersManagement />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
