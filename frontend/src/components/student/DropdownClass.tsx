import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { Class } from '@/schemas/class.schema';
import { getClassesByStudentEmail } from '@/services/api/class';
import { fetchStudentData } from '@/services/custom/getStudentbyToken';

interface DropdownClassProps {
	onSelectClass: (selectedClass: Class | null) => void;
	selectedClass: Class | null;
}

const DropdownClass: React.FC<DropdownClassProps> = ({
	onSelectClass,
	selectedClass,
}) => {
	const [classes, setClasses] = useState<Class[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				setLoading(true);
				const student = await fetchStudentData();
				const fetchedClasses = await getClassesByStudentEmail(student.email);
				setClasses(fetchedClasses);

				// If there's no selected class and we have classes, select the first one
				if (!selectedClass && fetchedClasses.length > 0) {
					onSelectClass(fetchedClasses[0]);
				}
			} catch (error) {
				console.error('Error fetching classes:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchClasses();
	}, [onSelectClass, selectedClass]);

	const handleChange = (value: string) => {
		const selectedClass = classes.find((c) => c._id === value) || null;
		onSelectClass(selectedClass);
	};

	return (
		<Select
			style={{ width: 200 }}
			placeholder="Chọn lớp"
			onChange={handleChange}
			loading={loading}
			value={selectedClass?._id}
			notFoundContent="Không có lớp học"
		>
			{classes.map((classItem) => (
				<Select.Option key={classItem._id} value={classItem._id}>
					{classItem.name}
				</Select.Option>
			))}
		</Select>
	);
};

export default DropdownClass;
