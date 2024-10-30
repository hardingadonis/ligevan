import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Course } from '@/schemas/course.schema';
import { getCourseById } from '@/services/api/course';
import {
	updateCourseById,
	updateCourseFulfilled,
	updateCoursePending,
	updateCourseRejected,
} from '@/slices/course';
import store from '@/store';
import { formatPriceWithoutSymbol } from '@/utils/formatPrice';
import { validateNumber } from '@/utils/inputValidate';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const FormEditCourse: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [form] = Form.useForm();
	const { loading } = useSelector((state: RootState) => state.courses);
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				if (id) {
					const course = await getCourseById(id);
					form.setFieldsValue(course);
					setThumbnailUrl(course.thumbnail);
				} else {
					message.error('ID khoá học không hợp lệ');
				}
			} catch {
				message.error('Không thể lấy dữ liệu khoá học');
			}
		};
		fetchCourse();
	}, [id, form]);

	const onFinish = async (values: Partial<Course>) => {
		if (id) {
			dispatch(updateCoursePending());
			dispatch(updateCourseById({ id, values }))
				.unwrap()
				.then(() => {
					dispatch(updateCourseFulfilled());
					message.success('Cập nhật khoá học thành công.');
					navigate(`/admin/courses/${id}`);
				})
				.catch((error: { message: string }) => {
					dispatch(updateCourseRejected(error.message));
					message.error('Cập nhật khoá học thất bại!');
				});
		} else {
			message.error('ID khoá học không hợp lệ!');
		}
	};

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setThumbnailUrl(e.target.value);
	};

	const validatePrice = (_: unknown, value: string) => {
		if (!value) {
			return Promise.reject(new Error('Vui lòng nhập giá khoá học!'));
		}
		if (!validateNumber(value.toString())) {
			return Promise.reject(new Error('Giá khoá học không hợp lệ!'));
		}
		return Promise.resolve();
	};

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link={`/admin/courses/${id}`} />
				</div>
				<h2>Chỉnh sửa thông tin khoá học</h2>
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
						maxWidth: '1000px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
						padding: '20px',
						borderRadius: '8px',
						backgroundColor: '#f5f5f5',
						width: '100%',
					}}
				>
					<Form
						form={form}
						onFinish={onFinish}
						layout="horizontal"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 20 }}
						labelAlign="left"
						style={{ margin: '15px 20px' }}
					>
						<Form.Item
							style={{ fontWeight: 'bold' }}
							name="code"
							label="Mã khoá học"
							rules={[
								{ required: true, message: 'Vui lòng nhập mã khoá học!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{ fontWeight: 'bold' }}
							name="price"
							label="Giá"
							rules={[
								{ required: true, message: 'Vui lòng nhập giá khoá học!' },
								{ validator: validatePrice },
							]}
						>
							<InputNumber<number>
								min={0}
								suffix="₫"
								style={{ width: '100%' }}
								formatter={(value) =>
									value ? formatPriceWithoutSymbol(Number(value)) : ''
								}
								parser={(value) =>
									value ? Number(value.replace(/\D/g, '')) : 0
								}
							/>
						</Form.Item>
						<Form.Item
							style={{ fontWeight: 'bold' }}
							name="title"
							label="Tên khoá học"
							rules={[
								{ required: true, message: 'Vui lòng nhập tên khoá học!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{ fontWeight: 'bold' }}
							name="description"
							label="Mô tả"
							rules={[
								{ required: true, message: 'Vui lòng nhập mô tả khoá học!' },
							]}
						>
							<Input.TextArea rows={4} maxLength={1000} showCount />
						</Form.Item>
						<Form.Item
							style={{ fontWeight: 'bold' }}
							name="thumbnail"
							label="Ảnh mô tả"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập đường dẫn của ảnh!',
								},
							]}
						>
							<Input onChange={handleThumbnailChange} />
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
						<Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								style={{ backgroundColor: '#0cd14e', color: 'white' }}
								htmlType="submit"
								loading={loading}
								icon={<SaveOutlined />}
							>
								Lưu Lại
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default FormEditCourse;
