import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './redux/store';

// // INTRO
setTimeout(() => {
  if (!window.speechSynthesis.speaking) {
    const utterance = new SpeechSynthesisUtterance(" Hello , I'm Spiderman, your friendly neighborhood chatbot assistant. How can I assist you today?");
    window.speechSynthesis.speak(utterance)
  }
}, 2000)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


