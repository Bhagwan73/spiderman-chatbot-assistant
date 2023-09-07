import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextToSpeech from './TextToSpeech'
import RobotCanvas from './canvas/Robo'
import { useDispatch } from 'react-redux'  // USE_DISPATCH IS USE TO DIPTCH STATE
import { rotate } from '../redux/slices/roboSlice';  // TAKE THE ROTATE FUNCTION FROM ROBOSLICE
import { useSelector } from 'react-redux';   // SELECT THE ROTATE VALUE FOR HIGHLIGHT BUTTON
import { changeColor } from '../redux/slices/starSlice';


const VoiceInput = function () {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [called, setCalled] = useState(false);
  const dispatch = useDispatch()                // TAKE VARIABLE TO DISPATCH STATE
  const rotatValue = useSelector(state => state.rotate)  // SELECT ROTATE VALUE
  const [isRotate, setIsRotate] = useState(false);
  const audioRef = useRef(null);

  const handleMic = () => {
    audioRef.current.play()
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening();
    if (isRotate) handleView()  // WHEN ROATATION GOING ON AND USER CLICK ON MIC
  };

  useEffect(() => {
    if (transcript && !called && !listening) {
      TextToSpeech(transcript)   // call the text to speech function
      setCalled(true);
      resetTranscript();
    }
    if (!listening) setCalled(false)
  }, [transcript, called, listening, resetTranscript]);


  const handleView = () => {
    audioRef.current.play()
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    setIsRotate(!isRotate);
    dispatch(rotate())      // CALL ROTATE REDUCER FUNCTION   
    dispatch(changeColor())     // CALL COLOR REDUCER FUNCTION   
  }

  const handleReset = () => {
    audioRef.current.play()
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    resetTranscript()
    if (isRotate) handleView()
  }
  if (!browserSupportsSpeechRecognition)
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Browser doesn't support speech recognition."))

  return (
    <div className='chatbot'>
      <img src="/logo.svg" alt='logo' />
      <section>
        <div className="robo-model">
          < RobotCanvas />
        </div>
      </section>
      <div className="social-media">
        <div className='buttons'>
          <button onClick={handleMic}> {listening ? <i className='bx bx-stop'></i> : <i className='bx bxs-microphone'></i>}</button>
          <button onClick={handleReset}><i className='bx bx-revision'></i> </button>
          <button onClick={handleView}
            style={rotatValue ? { backgroundColor: "#ffde14", color: "#1f242d", boxShadow: "0 0 10px #ffde14" } : {}}>
            <i className='bx bx-street-view'></i>
          </button>
          <audio ref={audioRef} src="/pause.mp3" />
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
