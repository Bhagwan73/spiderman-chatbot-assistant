import React, { useEffect, useState,useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextToSpeech from './TextToSpeech'
import RobotCanvas from './canvas/Robo'
import {useDispatch} from 'react-redux'  // USE_DISPATCH IS USE TO DIPTCH STATE
import { rotate } from '../redux/slices/roboSlice';  // TAKE THE ROTATE FUNCTION FROM ROBOSLICE
import { useSelector } from 'react-redux';   // SELECT THE ROTATE VALUE FOR HIGHLIGHT BUTTON
import { changeColor } from '../redux/slices/starSlice';  

const VoiceInput = function() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [called, setCalled] = useState(false);
  const dispatch=useDispatch()                // TAKE VARIABLE TO DISPATCH STATE
  const rotatValue=useSelector(state=>state.rotate)  // SELECT ROTATE VALUE
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {  
    new Audio("/pause.mp3").play()
    if(window.speechSynthesis.speaking) window.speechSynthesis.cancel() 
    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening();
    if(isPlaying) handleActive()  // WHEN ROATATION GOING ON AND USER CLICK ON MIC
  };

  useEffect(() => {
    if (transcript && !called && !listening) {
      TextToSpeech(transcript)
      setCalled(true);
      resetTranscript();
    }
    if (!listening) setCalled(false)
  }, [transcript, called, listening, resetTranscript]);

  
   const handleActive=()=>{
    if(window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    const audio = audioRef.current;  
    if (isPlaying) { audio.pause() ; audio.currentTime = 0 } else  audio.play()
    setIsPlaying(!isPlaying);
    dispatch(rotate())      // CALL ROTATE REDUCER FUNCTION   
    dispatch(changeColor())     // CALL COLOR REDUCER FUNCTION   
  }   

  const handleReset=()=>{
    new Audio("/pause.mp3").play()
    if(window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    resetTranscript()
    if(isPlaying) handleActive() 
  }
  if (!browserSupportsSpeechRecognition) TextToSpeech("Browser doesn't support speech recognition.")
  return (
    <div className='chatbot'>
        <img src="/logo.svg" alt='logo' />
      <div className="flex-1 auto-height medium-height fixed-height">
        < RobotCanvas/>
      </div>
      <div className="social-media"> 
                <button onClick={handleClick}> { listening ? <i className='bx bx-stop'></i>: <i className='bx bxs-microphone'></i>  }</button>
                <button onClick={handleReset} ><i className='bx bx-revision'></i> </button>
                <button onClick={handleActive} 
                style={rotatValue ? {backgroundColor:"#ffde14",color:"#1f242d", boxShadow:"0 0 10px #ffde14"} :{} }> 
                <i className='bx bx-street-view'></i> 
                </button>
                <audio ref={audioRef} src="/bgm.mp3" loop  />
            </div> 
    </div>
  );
};

export default VoiceInput;
