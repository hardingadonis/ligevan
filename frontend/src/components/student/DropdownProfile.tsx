import {
	LogoutOutlined,
	ScheduleOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Student } from '@/schemas/student.schema';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';

const { Text } = Typography;

const DropdownProfile: React.FC = () => {
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const studentData = await fetchStudentData();
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
			{isMobile && (
				<>
					<Menu.Item key="studentName" disabled>
						{student?.fullName}
					</Menu.Item>
					<Menu.Divider />
				</>
			)}
			<Menu.Item key="profile" icon={<UserOutlined />}>
				Hồ sơ
			</Menu.Item>
			<Menu.Item key="schedule" icon={<ScheduleOutlined />}>
				Lịch học
			</Menu.Item>
			<Menu.Item key="logout" icon={<LogoutOutlined />}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);

	if (loading) {
		return <Spin />;
	}

	return (
		<Dropdown overlay={menu} trigger={['hover']}>
			<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
				{!isMobile && (
					<Text
						style={{ marginRight: 8, color: 'white' }}
						className="user-name"
					>
						{student?.fullName}
					</Text>
				)}
				<Avatar
					src={student?.avatar}
					icon={!student?.avatar && <UserOutlined />}
				/>
			</div>
		</Dropdown>
	);
};

export default DropdownProfile;
