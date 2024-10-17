import { Image, Layout, Typography } from 'antd';
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
				position: 'fixed',
				bottom: 0,
				width: '100%',
			}}
		>
			<Title level={5} style={{ margin: '10px 0 0 0' }}>
				Copyright © ligevan 2024
			</Title>
			<a href="https://github.com/hardingadonis/ligevan" target="_blank">
				<Image
					className="img-fluid"
					src="https://contrib.rocks/image?repo=hardingadonis/ligevan"
					style={{ transform: 'scale(0.50)' }}
				/>
			</a>
		</AntFooter>
	);
};

export default Footer;
