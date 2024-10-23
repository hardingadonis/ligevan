import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import store from '@/store';

import './assets/styles/global.css';
import './assets/styles/header.css';
import './assets/styles/listCenters.css';
import './assets/styles/listCourse.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
