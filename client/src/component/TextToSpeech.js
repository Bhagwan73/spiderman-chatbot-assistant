
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
        const utterance = new SpeechSynthesisUtterance("I'm sorry, but I'm currently experiencing connection issues and cannot provide a response at the moment. Please try again later. Apologies for the inconvenience.");
        window.speechSynthesis.speak(utterance);
      }
}
export default TextToSpeech