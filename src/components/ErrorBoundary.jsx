import React from 'react';

/**
 * Global Error Boundary
 * Prevents full-page white screens by catching unhandled rendering exceptions
 * and displaying a graceful luxury recovery view.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lune ErrorBoundary caught an exception:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('lune_current_user');
      localStorage.removeItem('lune_user_authenticated');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF7F2',
          padding: '24px',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          color: '#2C2117'
        }}>
          <div style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E7DDCE',
            borderRadius: '6px',
            padding: '36px 30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(44, 33, 23, 0.08)'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#FAF5F2',
              border: '1px solid #E8D3C8',
              color: '#8F534F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              fontSize: '1.4rem',
              fontWeight: 700
            }}>
              !
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.4rem',
              margin: '0 0 8px',
              color: '#2C2117'
            }}>
              Phiên làm việc gặp sự cố
            </h2>
            <p style={{
              fontSize: '0.88rem',
              color: '#5C4A3A',
              lineHeight: '1.6',
              margin: '0 0 24px'
            }}>
              Đã phát hiện vòng lặp điều hướng hoặc dữ liệu phiên làm việc không đồng bộ. Vui lòng làm mới để khôi phục trạng thái ổn định.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#775B3F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                Khôi phục & Về Trang chủ
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = '/login'; }}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#FFFFFF',
                  color: '#2C2117',
                  border: '1px solid #C8AE84',
                  borderRadius: '4px',
                  fontWeight: 500,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                Đăng nhập lại
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
