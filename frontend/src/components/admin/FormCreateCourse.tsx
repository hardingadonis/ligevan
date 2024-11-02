import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, message } from 'antd';
import React, { useState } from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import type { Course } from '@/schemas/course.schema';
import { createCourse } from '@/services/api/course';
import { formatPrice } from '@/utils/formatPrice';

interface CourseFormProps {
	onSuccess: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSuccess }) => {
	const [loading, setLoading] = useState(false);
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
	const [form] = Form.useForm();

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
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link="/admin/courses" />
				</div>
				<h2>Tạo khóa học mới</h2>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						maxWidth: 1000,
						padding: '10px 90px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
						borderRadius: '8px',
						backgroundColor: '#f5f5f5',
						width: '100%',
					}}
				>
					<Row>
						<Col span={24}>
							<Form
								form={form}
								layout="vertical"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								style={{ marginTop: '40px' }}
								className="custom-form"
								onFinish={onFinish}
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
										label={
											<span style={{ fontWeight: 'bold' }}>Mã khóa học</span>
										}
										rules={[
											{ required: true, message: 'Vui lòng nhập mã khóa học!' },
										]}
									>
										<Input placeholder="Nhập mã khóa học" />
									</Form.Item>

									<Form.Item
										name="price"
										label={
											<span style={{ fontWeight: 'bold' }}>Giá khóa học</span>
										}
										rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
									>
										<InputNumber<number>
											min={0}
											placeholder="Nhập giá khóa học"
											style={{ width: '100%' }}
											formatter={(value) =>
												value ? formatPrice(Number(value)) : ''
											}
											parser={(value) =>
												value ? Number(value.replace(/\D/g, '')) : 0
											}
										/>
									</Form.Item>
								</div>

								<Form.Item
									name="title"
									label={
										<span style={{ fontWeight: 'bold' }}>Tên khóa học</span>
									}
									rules={[
										{ required: true, message: 'Vui lòng nhập tên khóa học!' },
									]}
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
									label={
										<span style={{ fontWeight: 'bold' }}>Đường dẫn ảnh</span>
									}
									rules={[
										{ required: true, message: 'Vui lòng nhập đường dẫn ảnh!' },
									]}
								>
									<Input
										placeholder="Nhập đường dẫn hình ảnh"
										onChange={handleThumbnailChange}
									/>
								</Form.Item>
								{thumbnailUrl && (
									<Form.Item style={{ fontWeight: 'bold' }} label="Xem trước">
										<img
											src={thumbnailUrl}
											alt="Ảnh xem trước"
											style={{ maxWidth: '100%', maxHeight: '200px' }}
										/>
									</Form.Item>
								)}

								<Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
									<Button
										type="primary"
										htmlType="submit"
										loading={loading}
										icon={<PlusOutlined />}
										style={{
											backgroundColor: '#0cd14e',
											color: 'white',
										}}
									>
										{loading ? 'Đang tạo...' : 'Tạo khóa học mới'}
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
