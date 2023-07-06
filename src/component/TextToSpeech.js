
const TextToSpeech=async function(question){    
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/chat`, {
          method: 'POST',  
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat: [{ role: 'user', content: question }],
          }),
        });
        const result = await response.json();
        console.log(result)
        const utterance = new SpeechSynthesisUtterance(result.data);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        const utterance = new SpeechSynthesisUtterance(error.message);
        window.speechSynthesis.speak(utterance);
      }
}
export default TextToSpeech