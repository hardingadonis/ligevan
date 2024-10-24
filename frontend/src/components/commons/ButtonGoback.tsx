import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ButtonGoBackProps {
	link?: string;
}

const ButtonGoBack: React.FC<ButtonGoBackProps> = ({ link }) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		if (link) {
			navigate(link);
		} else {
			const currentPath = window.location.pathname;
			const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
			navigate(newPath);
		}
	};

	return (
		<Button
			style={{
				backgroundColor: '#001529',
				color: 'white',
				marginBottom: '20px',
			}}
			onClick={handleGoBack}
		>
			<ArrowLeftOutlined />
			Quay Lại
		</Button>
	);
};

export default ButtonGoBack;
