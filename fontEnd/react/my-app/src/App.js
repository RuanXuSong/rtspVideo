import { VIDEO_URL } from './constant';
import './App.css';
import LiveVideo from './components/LiveVideo.tsx';

function App() {
  return (
    <div className="App">
      <LiveVideo
        muted
        autoPlay
        controls
        style={{ width: '1000px' }}
        wsUrl="ws://localhost:8888/"
        videoUrl={VIDEO_URL}
      />
    </div>
  );
}

export default App;
