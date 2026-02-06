import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Language } from '../types';

// 本地类型定义（避免模块解析问题）
interface ErrorBoundaryProps {
  children: ReactNode;
  lang: Language;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const TRANSLATIONS = {
  en: {
    title: 'Something went wrong',
    description: "We're sorry, but something unexpected happened. Please refresh the page to continue.",
    retry: 'Refresh Page',
    details: 'Error Details',
  },
  zh: {
    title: '出错了',
    description: '抱歉，发生了意外错误。请刷新页面继续。',
    retry: '刷新页面',
    details: '错误详情',
  },
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, lang } = this.props;
    const t = TRANSLATIONS[lang];

    if (hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-800 mb-3">{t.title}</h1>

            {/* Description */}
            <p className="text-slate-600 mb-6">{t.description}</p>

            {/* Error Details (collapsible) */}
            {error && (
              <div className="mb-6 text-left">
                <details className="bg-slate-100 rounded-lg p-4">
                  <summary className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                    {t.details}
                  </summary>
                  <pre className="mt-3 text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap break-all">
                    {error.message}
                  </pre>
                </details>
              </div>
            )}

            {/* Retry Button */}
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {t.retry}
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
