import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import SlideContainer from './components/common/SlideContainer';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <SlideContainer />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
