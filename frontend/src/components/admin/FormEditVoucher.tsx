import { Button, Col, Form, Input, Row, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Voucher } from '@/schemas/voucher.schema';
import { getVoucherById, updateVoucher } from '@/services/api/voucher';

const FormEditVoucher: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [voucher, setVoucher] = useState<Voucher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVoucher = async () => {
			if (!id) return;
			try {
				const fetchedVoucher = await getVoucherById(id);
				setVoucher(fetchedVoucher);
				form.setFieldsValue(fetchedVoucher);
			} catch (error) {
				console.error('Lỗi khi lấy chi tiết mã giảm giá:', error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchVoucher();
		}
	}, [id, form]);

	const handleUpdate = async (values: Voucher) => {
		if (!id) return;
		try {
			await updateVoucher(id, values);
			message.success('Mã giảm giá đã được cập nhật thành công!', 3);
			navigate(`/admin/vouchers`);
		} catch (error) {
			console.error('Lỗi khi cập nhật mã giảm giá:', error);
			message.error('Lỗi: Đã xảy ra lỗi khi cập nhật mã giảm giá!', 3);
		}
	};

	if (loading) {
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!voucher) {
		return <div>Không tìm thấy mã giảm giá</div>;
	}

	return (
		<div style={{ paddingLeft: '270px' }}>
			<div style={{ textAlign: 'center', marginBottom: 20 }}>
				<h2>Chỉnh sửa mã giảm giá</h2>
			</div>

			<div
				style={{
					maxWidth: 1000,
					margin: '0 auto',
					padding: '10px 90px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					borderRadius: '8px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Form
					form={form}
					layout="vertical"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					style={{ marginTop: '40px' }}
					className="custom-form"
					onFinish={handleUpdate}
				>
					<Row>
						<Col span={11}>
							<Form.Item name="code" label="Mã giảm giá" labelAlign="left">
								<Input readOnly />
							</Form.Item>
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<Form.Item name="value" label="Giá trị" labelAlign="left">
								<Input suffix="%" />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="title" label="Tiêu đề" labelAlign="left">
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Mô tả" labelAlign="left">
						<Input />
					</Form.Item>
					<Row>
						<Col span={11}>
							<Form.Item
								name="start"
								label="Thời gian bắt đầu"
								labelAlign="left"
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<Form.Item
								name="end"
								label="Thời gian kết thúc"
								labelAlign="left"
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
						<Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
							Lưu
						</Button>
						<Button type="default" onClick={() => navigate(`/admin/vouchers`)}>
							Hủy
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default FormEditVoucher;
