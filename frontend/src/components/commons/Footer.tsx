import { Layout, Typography } from 'antd';
import React from 'react';

const { Footer: AntFooter } = Layout;
const { Title } = Typography;

const Footer: React.FC = () => {
	return (
		<AntFooter
			style={{
				textAlign: 'center',
				padding: 0,
				boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
				width: '100%',
				bottom: 0,
				left: 0,
				zIndex: 1,
			}}
		>
			<Title level={5} style={{ margin: '10px 0 0 0' }}>
				Copyright © ligevan 2024
			</Title>
			<a
				href="https://github.com/hardingadonis/ligevan"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					alt="contributors"
					src="https://contrib.rocks/image?repo=hardingadonis/ligevan"
					style={{ transform: 'scale(0.65)' }}
				/>
			</a>
		</AntFooter>
	);
};

export default Footer;
