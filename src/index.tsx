import React from 'react';
import {Provider} from 'react-redux';
import App from '@/app/App';
import store from '@/app/configureStore'
import {createRoot} from "react-dom/client";

const container = document.getElementById('cookie-consent-history-app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
