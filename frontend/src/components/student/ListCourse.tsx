import { SearchOutlined } from '@ant-design/icons';
import { Alert, Col, Empty, Input, Pagination, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import CardCourse from '@/components/student/CardCourse';
import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { getAllCourse } from '@/services/api/course';

// const { Search } = Input;

interface ListCourseProps {
	selectedCenter: Center | null;
}

const ListCourse: React.FC<ListCourseProps> = ({ selectedCenter }) => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchValue, setSearchValue] = useState<string>('');

	useEffect(() => {
		const fetchCourses = async () => {
			setLoading(true);
			try {
				if (selectedCenter) {
					setCourses(selectedCenter.courses || []);
					setFilteredCourses(selectedCenter.courses || []);
				} else {
					const data = await getAllCourse();
					setCourses(data);
					setFilteredCourses(data);
				}
			} catch {
				setError('Failed to fetch courses');
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, [selectedCenter]);

	const handleSearch = (value: string) => {
		setSearchValue(value);
		const filtered = courses.filter((course) =>
			course.title.toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredCourses(filtered);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setSearchValue('');
				setFilteredCourses(courses);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [courses]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const pageSize = 4;
	const paginatedCourses = filteredCourses.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	if (loading) {
		return (
			<div style={{ display: 'inline-flex', alignItems: 'center' }}>
				<Spin />
				<span style={{ marginLeft: 8 }}>Đang tải...</span>
			</div>
		);
	}

	if (error) {
		return <Alert message="Error" description={error} type="error" showIcon />;
	}

	return (
		<>
			<div className="search-container">
				{/* <Search
					placeholder="Tìm kiếm khoá học"
					value={searchValue}
					onSearch={handleSearch}
					onChange={(e) => handleSearch(e.target.value)}
					className="search-input"
				/> */}
				<Input
					placeholder="Tìm kiếm khoá học"
					value={searchValue}
					onChange={(e) => handleSearch(e.target.value)}
					className="search-input"
					prefix={<SearchOutlined />}
				/>
			</div>
			{filteredCourses.length === 0 ? (
				<Empty description="Không tìm thấy khoá học." />
			) : (
				<>
					<Row gutter={[24, 24]}>
						{paginatedCourses.map((course) => (
							<Col xs={24} sm={12} md={12} lg={12} xl={12} key={course._id}>
								<CardCourse
									course={course}
									selectedCenterId={selectedCenter?._id || null}
								/>
							</Col>
						))}
					</Row>
					<div
						style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
					>
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={filteredCourses.length}
							onChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ListCourse;
