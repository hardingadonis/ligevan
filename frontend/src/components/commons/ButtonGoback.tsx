import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ButtonGoBack = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
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
