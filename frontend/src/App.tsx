import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

const HomepageStudent = lazy(() => import('@/pages/student/Homepage'));

const App: React.FC = () => {
	return (
		<Router>
			<Suspense fallback={<div><Spin size="large" /> Đang tải...</div>}>
				<Routes>
					<Route path="/student" element={<HomepageStudent />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
