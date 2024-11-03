import { ArrowLeftOutlined, WalletOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Col,
	Form,
	Modal,
	Row,
	Select,
	Spin,
	Typography,
} from 'antd';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Course } from '@/schemas/course.schema';
import { Student } from '@/schemas/student.schema';
import { Voucher } from '@/schemas/voucher.schema';
import { apiBaseUrl } from '@/utils/apiBase';
import { formatPrice } from '@/utils/formatPrice';
import { decodeToken } from '@/utils/jwtDecode';

const { Option } = Select;
const { Title, Text } = Typography;

interface PaymentFormValues {
	voucher?: string;
	method: 'momo' | 'zalo-pay';
}

interface ApiErrorResponse {
	message: string;
}

const StudentRegister: React.FC = () => {
	const { courseID, centerID } = useParams<{
		courseID: string;
		centerID: string;
	}>();
	const location = useLocation();
	const navigate = useNavigate();
	const { classID } = location.state || {};

	const [course, setCourse] = useState<Course | null>(null);
	const [className, setClassName] = useState<string>('');
	const [vouchers, setVouchers] = useState<Voucher[]>([]);
	const [originPrice, setOriginPrice] = useState<number>(0);
	const [finalPrice, setFinalPrice] = useState<number>(0);
	const [voucherPercent, setVoucherPercent] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [initialDataLoading, setInitialDataLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [student, setStudent] = useState<Student | null>(null);
	const [form] = Form.useForm<PaymentFormValues>();

	// Memoize static values
	const token = useMemo(() => localStorage.getItem('token') ?? '', []);
	const today = useMemo(() => dayjs(), []); // Memoize today's date

	const handleGoBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const fetchClassName = useCallback(async () => {
		if (!classID) return;
		try {
			const { data } = await axios.get(`${apiBaseUrl}/api/classes/${classID}`);
			setClassName(data.name);
		} catch (err) {
			console.error('Error fetching class name:', err);
			setError('Không thể lấy thông tin lớp học.');
		}
	}, [classID]);

	const fetchCourse = useCallback(async () => {
		if (!courseID) return;
		try {
			const { data } = await axios.get<Course>(
				`${apiBaseUrl}/api/courses/${courseID}`,
			);
			setCourse(data);
			setOriginPrice(data.price);
			setFinalPrice(data.price);
		} catch (err) {
			console.error('Error fetching course:', err);
			setError('Không thể lấy thông tin khóa học.');
		}
	}, [courseID]);

	const fetchVouchers = useCallback(async () => {
		if (!centerID) return;
		try {
			// Sửa lại endpoint để lấy voucher từ center
			const { data } = await axios.get<{ vouchers: Voucher[] }>(
				`${apiBaseUrl}/api/centers/${centerID}`,
			);
			const validVouchers = data.vouchers.filter((voucher) => {
				const start = dayjs(voucher.start).startOf('day');
				const end = dayjs(voucher.end).endOf('day');
				return today.isAfter(start) && today.isBefore(end);
			});
			setVouchers(validVouchers);
		} catch (err) {
			console.error('Error fetching vouchers:', err);
			setError('Không thể lấy thông tin voucher.');
		}
	}, [centerID, today]);
	// today is now memoized

	const fetchStudent = useCallback(async () => {
		if (!token) return;
		try {
			const decoded = decodeToken(token);
			const { data } = await axios.get<Student>(
				`${apiBaseUrl}/api/students/email/${encodeURIComponent(decoded.sub)}`,
			);
			setStudent(data);
		} catch (e) {
			console.error('Error fetching student:', e);
			setError('Không thể lấy thông tin học viên.');
		}
	}, [token]); // token is now memoized

	useEffect(() => {
		const controller = new AbortController();

		const loadInitialData = async () => {
			try {
				setInitialDataLoading(true);
				await Promise.all([
					fetchClassName(),
					fetchCourse(),
					fetchVouchers(),
					fetchStudent(),
				]);
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') {
					return;
				}
				console.error('Error loading initial data:', error);
				setError('Có lỗi xảy ra khi tải dữ liệu.');
			} finally {
				if (!controller.signal.aborted) {
					setInitialDataLoading(false);
				}
			}
		};

		loadInitialData();

		return () => {
			controller.abort();
		};
	}, [fetchClassName, fetchCourse, fetchVouchers, fetchStudent]);

	const handleVoucherChange = useCallback(
		(voucherId: string) => {
			const selectedVoucher = vouchers.find((v) => v._id === voucherId);
			const percent = selectedVoucher ? selectedVoucher.value : 0;
			setVoucherPercent(percent);
			const discount = (originPrice * percent) / 100;
			setFinalPrice(Math.round(originPrice - discount));
		},
		[vouchers, originPrice],
	);

	const handlePayment = async (values: PaymentFormValues) => {
		if (!course || !student) {
			Modal.error({
				title: 'Lỗi',
				content: 'Thiếu thông tin học viên hoặc khóa học.',
			});
			return;
		}

		try {
			setLoading(true);
			const selectedVoucher = vouchers.find((v) => v._id === values.voucher);
			const paymentData = {
				student: student._id,
				course: course._id,
				class: classID,
				voucher: selectedVoucher?._id ?? null,
				originPrice,
				finalPrice,
				method: values.method,
			};
			const { data } = await axios.post(
				`${apiBaseUrl}/api/payments`,
				paymentData,
			);
			window.location.href = data.payment_url;
		} catch (error) {
			const axiosError = error as AxiosError<ApiErrorResponse>;
			if (axiosError.response && axiosError.response.status === 409) {
				Modal.error({
					title: 'Đã đăng ký',
					content: 'Bạn đã đăng ký khóa học này rồi.',
				});
			} else {
				const message =
					axiosError.response?.data.message ?? 'Có lỗi không xác định.';
				Modal.error({
					title: 'Thanh toán thất bại',
					content: 'Có lỗi xảy ra trong quá trình thanh toán: ' + message,
				});
			}
		} finally {
			setLoading(false);
		}
	};

	if (initialDataLoading) return <Spin size="large" />;
	if (error) return <Alert message={error} type="error" showIcon />;
	if (!course)
		return <Alert message="Không tìm thấy khóa học" type="error" showIcon />;

	return (
		<div style={{ padding: '20px' }}>
			<Row style={{ marginBottom: '20px', alignItems: 'center' }}>
				<Col span={2}>
					<Button
						onClick={handleGoBack}
						style={{ backgroundColor: '#001529', color: 'white' }}
					>
						<ArrowLeftOutlined style={{ marginRight: '8px' }} />
						Quay Lại
					</Button>
				</Col>
				<Col span={20}>
					<Title level={2} style={{ textAlign: 'center' }}>
						Đăng ký khóa học
					</Title>
				</Col>
			</Row>

			<Row gutter={[16, 16]} justify="center">
				<Col xs={24} sm={12}>
					<Card
						style={{
							border: '1px dashed black',
							padding: '20px',
							minHeight: '300px',
							height: '100%',
						}}
					>
						<Text strong>Tên khóa học:</Text> {course.title}
						<br />
						<Text strong>Tên lớp học:</Text> {className}
						<Form
							id="payment-form"
							form={form}
							layout="vertical"
							onFinish={handlePayment}
							initialValues={{ method: 'momo' }}
						>
							<Form.Item label="Voucher" name="voucher">
								<Select
									placeholder="Chọn voucher"
									onChange={handleVoucherChange}
								>
									<Option value="">Không có</Option>
									{vouchers.map((v) => (
										<Option key={v._id} value={v._id}>
											{v.title} ({v.value}%)
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								label="Phương thức thanh toán"
								name="method"
								rules={[
									{ required: true, message: 'Vui lòng chọn phương thức' },
								]}
							>
								<Select placeholder="Chọn phương thức thanh toán">
									<Option value="momo">Momo</Option>
									<Option value="zalo-pay">ZaloPay</Option>
								</Select>
							</Form.Item>
						</Form>
					</Card>
				</Col>

				<Col xs={24} sm={12}>
					<Card
						style={{
							border: '1px dashed black',
							padding: '20px',
							minHeight: '300px',
							height: '100%',
							position: 'relative',
						}}
					>
						{/* Container for price details */}
						<div
							style={{
								maxWidth: '100%',
								overflow: 'hidden',
							}}
						>
							<Row style={{ marginBottom: '16px' }}>
								<Col span={12}>
									<Text
										strong
										style={{ fontSize: '24px', whiteSpace: 'nowrap' }}
									>
										Giá gốc:
									</Text>
								</Col>
								<Col
									span={12}
									style={{
										textAlign: 'right',
										fontSize: '25px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{formatPrice(originPrice)}
								</Col>
							</Row>

							<Row style={{ marginBottom: '16px' }}>
								<Col span={12}>
									<Text
										strong
										style={{ fontSize: '24px', whiteSpace: 'nowrap' }}
									>
										Voucher:
									</Text>
								</Col>
								<Col
									span={12}
									style={{
										textAlign: 'right',
										fontSize: '25px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{voucherPercent} %
								</Col>
							</Row>

							<Row>
								<Col span={12}>
									<Text
										strong
										style={{ fontSize: '24px', whiteSpace: 'nowrap' }}
									>
										Tổng:
									</Text>
								</Col>
								<Col
									span={12}
									style={{
										textAlign: 'right',
										fontSize: '25px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{formatPrice(finalPrice)}
								</Col>
							</Row>
						</div>

						{/* Container for the payment button */}
						<div
							style={{
								position: 'absolute',
								bottom: '20px',
								right: '20px',
								width: 'auto',
							}}
						>
							<Button
								type="primary"
								size="large"
								htmlType="submit"
								form="payment-form"
								icon={<WalletOutlined />}
								loading={loading}
							>
								Thanh toán
							</Button>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default StudentRegister;
