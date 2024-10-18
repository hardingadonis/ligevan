import {
	LogoutOutlined,
	ScheduleOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { Student } from '@/schemas/student.schema';
import { getStudentByEmail } from '@/services/api/student';
import { decodeToken } from '@/utils/jwtDecode';

const { Text } = Typography;

const DropdownProfile: React.FC = () => {
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No token found');
				}

				const decoded = decodeToken(token);
				const email = decoded.sub;

				const studentData = await getStudentByEmail(email);
				setStudent(studentData);
			} catch (error) {
				console.error('Error fetching student:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchStudent();
	}, []);

	const handleMenuClick = ({ key }: { key: string }) => {
		switch (key) {
			case 'profile':
				window.location.href = '/student/profile';
				break;
			case 'schedule':
				window.location.href = '/student/schedule';
				break;
			case 'logout':
				localStorage.removeItem('token');
				window.location.href = '/student';
				break;
			default:
				break;
		}
	};

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="profile" icon={<UserOutlined />}>
				Profile
			</Menu.Item>
			<Menu.Item key="schedule" icon={<ScheduleOutlined />}>
				Schedule
			</Menu.Item>
			<Menu.Item key="logout" icon={<LogoutOutlined />}>
				Logout
			</Menu.Item>
		</Menu>
	);

	if (loading) {
		return <Spin />;
	}

	return (
		<Dropdown overlay={menu} trigger={['hover']}>
			<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
				<Text style={{ marginRight: 8, color: 'white' }} className="user-name">
					{student?.fullName}
				</Text>
				<Avatar
					src={student?.avatar}
					icon={!student?.avatar && <UserOutlined />}
				/>
			</div>
		</Dropdown>
	);
};

export default DropdownProfile;
