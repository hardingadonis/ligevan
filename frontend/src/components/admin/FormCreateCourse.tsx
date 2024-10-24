import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, message } from 'antd';
import React, { useState } from 'react';

import type { Course } from '@/schemas/course.schema';
import { createCourse } from '@/services/api/course';
import { formatPrice } from '@/utils/formatPrice';

interface CourseFormProps {
	onSuccess: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSuccess }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

	const onFinish = async (values: Course) => {
		setLoading(true);
		try {
			await createCourse(values);
			message.success('Tạo khóa học thành công!');
			onSuccess();
		} catch (error) {
			message.error('Không thể tạo khóa học.');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setThumbnailUrl(e.target.value);
	};

	return (
		<div style={{ padding: '0 30px 0 150px', marginLeft: '110px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Tạo khóa học mới</h2>
			</div>
			<Card
				className="course-form-card"
				style={{ backgroundColor: '#f5f5f5', padding: '24px' }}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					requiredMark={false}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '16px',
							marginBottom: '16px',
						}}
					>
						<Form.Item
							name="code"
							label={<span style={{ fontWeight: 'bold' }}>Mã khóa học</span>}
							rules={[
								{ required: true, message: 'Vui lòng nhập mã khóa học!' },
							]}
						>
							<Input placeholder="Nhập mã khóa học" />
						</Form.Item>

						<Form.Item
							name="price"
							label={<span style={{ fontWeight: 'bold' }}>Giá khóa học</span>}
							rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
						>
							<InputNumber<number>
								min={0}
								placeholder="Nhập giá khóa học"
								style={{ width: '100%' }}
								formatter={(value) => (value ? formatPrice(Number(value)) : '')}
								parser={(value) =>
									value ? Number(value.replace(/\D/g, '')) : 0
								}
							/>
						</Form.Item>
					</div>

					<Form.Item
						name="title"
						label={<span style={{ fontWeight: 'bold' }}>Tên khóa học</span>}
						rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
					>
						<Input placeholder="Nhập tên khóa học" />
					</Form.Item>

					<Form.Item
						name="description"
						label={<span style={{ fontWeight: 'bold' }}>Mô tả</span>}
					>
						<Input.TextArea rows={4} placeholder="Nhập mô tả khóa học" />
					</Form.Item>

					<Form.Item
						name="thumbnail"
						label={<span style={{ fontWeight: 'bold' }}>URL Hình ảnh</span>}
					>
						<Input
							placeholder="Nhập đường dẫn hình ảnh"
							onChange={handleThumbnailChange}
						/>
					</Form.Item>

					<Form.Item
						label={
							<span style={{ fontWeight: 'bold' }}>Xem trước hình ảnh</span>
						}
					>
						{thumbnailUrl && (
							<img
								src={thumbnailUrl}
								alt="Ảnh xem trước"
								style={{ maxWidth: '100%', maxHeight: '200px' }}
							/>
						)}
					</Form.Item>

					<Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							icon={<PlusOutlined />}
							style={{
								border: '1px solid #1890ff',
								backgroundColor: 'white',
								color: '#1890ff',
							}}
						>
							{loading ? 'Đang tạo...' : 'Tạo khóa học mới'}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default CourseForm;
