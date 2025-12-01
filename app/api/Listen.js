import { useState, useEffect, useRef } from "react";

export const useSpeechRecognition = (setMessageInput) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const timeoutRef = useRef(null); // Use ref to store timeout ID

  useEffect(() => {
    // Check if SpeechRecognition is supported by the browser
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      speechRecognition.lang = "en-UK";
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;

      // Set the state once recognition is initialized
      setRecognition(speechRecognition);
    } else {
      console.error("Speech Recognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (!recognition) return;

    recognition.start();
    setIsListening(true);

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessageInput(transcript); // Update the message input with speech recognition result
      console.log("Recognized speech:", transcript);

        // Clear previous timeout if speech is detected
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
      
        // Set a new timeout to stop after 3 seconds of silence
        timeoutRef.current = setTimeout(() => {
        stopListening(); // Stop recognition after silence
        }, 1000); // 1000ms (1 second) of silence before stopping
      
    };

    recognition.onerror = (event) => {
      console.error("Error in speech recognition:", event.error);
      setIsListening(false); // Reset state in case of error
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false); // Reset state when recognition ends
    };
  };

    const stopListening = () => {
        if (recognition && isListening) {
            console.log("Stopping speech recognition...");

    // Clear the timeout if any before stopping
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

    // Try stopping immediately
      recognition.stop();

    // Add a small timeout to ensure the stop action completes
      setTimeout(() => {
        setIsListening(false); // Set the state to stop listening immediately after stopping
      }, 100); // Small timeout to ensure UI reflects the stop state quickly
    }
  };

  return { isListening, startListening, stopListening };
};