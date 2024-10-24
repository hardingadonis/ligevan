import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonGoBack from '@/components/commons/ButtonGoback';
import { Center } from '@/schemas/center.schema';
import { getCenterById } from '@/services/api/center';
import {
	updateCenterById,
	updateCenterFulfilled,
	updateCenterPending,
	updateCenterRejected,
} from '@/slices/center';
import store from '@/store';
import {
	validatePhoneNumber,
	validateVietnameseAddress,
	validateVietnamesePhoneNumber,
} from '@/utils/inputValidate';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const FormEditCenter: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [form] = Form.useForm();
	const { loading } = useSelector((state: RootState) => state.centers);

	useEffect(() => {
		const fetchCenter = async () => {
			try {
				if (id) {
					const center = await getCenterById(id);
					form.setFieldsValue(center);
				} else {
					message.error('ID trung tâm không hợp lệ');
				}
			} catch {
				message.error('Không thể lấy dữ liệu trung tâm');
			}
		};
		fetchCenter();
	}, [id, form]);

	const onFinish = async (values: Partial<Center>) => {
		if (id) {
			dispatch(updateCenterPending());
			dispatch(updateCenterById({ id, values }))
				.unwrap()
				.then(() => {
					dispatch(updateCenterFulfilled());
					message.success('Cập nhật trung tâm thành công.');
					navigate(`/admin/centers/${id}`);
				})
				.catch((error: { message: string }) => {
					dispatch(updateCenterRejected(error.message));
					message.error('Cập nhật trung tâm thất bại!');
				});
		} else {
			message.error('ID trung tâm không hợp lệ!');
		}
	};

	const validatePhone = (_: unknown, value: string) => {
		if (!value) {
			return Promise.reject(
				new Error('Vui lòng nhập số điện thoại trung tâm!'),
			);
		}
		if (!validatePhoneNumber(value)) {
			return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
		}
		if (!validateVietnamesePhoneNumber(value)) {
			return Promise.reject(
				new Error('Số điện thoại không đúng định dạng Việt Nam!'),
			);
		}
		return Promise.resolve();
	};

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<div style={{ textAlign: 'left' }}>
					<ButtonGoBack link={`/admin/centers/${id}`} />
				</div>
				<h2>Chỉnh sửa trung tâm</h2>
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
						maxWidth: '800px',
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
							name="name"
							label="Tên"
							rules={[
								{ required: true, message: 'Vui lòng nhập tên trung tâm!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: 'Vui lòng nhập email trung tâm!' },
								{ type: 'email', message: 'Email không hợp lệ!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="address"
							label="Địa chỉ"
							rules={[
								{ required: true, message: 'Vui lòng nhập địa chỉ trung tâm!' },
								{
									validator: (_, value) =>
										validateVietnameseAddress(value)
											? Promise.resolve()
											: Promise.reject(new Error('Địa chỉ không hợp lệ!')),
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Số điện thoại"
							rules={[{ required: true }, { validator: validatePhone }]}
						>
							<Input />
						</Form.Item>
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

export default FormEditCenter;
