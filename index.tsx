import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 获取根元素并挂载应用
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("找不到根元素进行挂载");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);