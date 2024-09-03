import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(_Fragment, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
