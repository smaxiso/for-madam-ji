import { Component } from 'react';
import { motion } from 'framer-motion';

/**
 * ErrorBoundary component to catch and display errors gracefully
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.state = {
      hasError: true,
      error,
      errorInfo,
    };
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream to-peach flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-medium rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold text-soft-rose mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-grey mb-6">
              Don&apos;t worry, we can fix this!
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-white/10 rounded-lg p-4 mb-4 text-left text-xs">
                <p className="font-bold text-soft-rose mb-2">Error Details:</p>
                <p className="text-muted-grey break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            
            <motion.button
              onClick={this.handleReset}
              className="px-6 py-3 bg-gradient-to-r from-blush to-soft-rose text-white font-semibold rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reload Page 🔄
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
