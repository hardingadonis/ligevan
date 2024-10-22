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
			type="primary"
			onClick={handleGoBack}
			style={{ marginBottom: '20px' }}
		>
			Quay Lại
		</Button>
	);
};

export default ButtonGoBack;
