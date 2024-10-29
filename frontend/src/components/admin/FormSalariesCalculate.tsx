import { ConfigProvider } from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React from 'react';

import ButtonGoBack from '@/components/commons/ButtonGoback';

dayjs.locale('vi');

const FormSalariesCalculate: React.FC = () => {
	return (
		<ConfigProvider locale={locale}>
			<div style={{ paddingLeft: '270px' }}>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<div style={{ textAlign: 'left' }}>
						<ButtonGoBack />
					</div>
					<h2>Tính lương cho các giáo viên</h2>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default FormSalariesCalculate;
