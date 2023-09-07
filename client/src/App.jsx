import './App.css'
import StarsCanvas from './component/canvas/Stars';
import VoiceInput from './component/Voice';

export default function App() {

  return (
      <div className="chatbot-wrapper">
        <VoiceInput />
        <StarsCanvas />
      </div>
  );
}


