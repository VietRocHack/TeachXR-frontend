import React from "react";
import robot1 from "./assets/robot1.png";
import robot2 from "./assets/robot2.png";
import image from "./assets/image.png";

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Vapi from "@vapi-ai/web";
import { VAPI_KEY } from "./utils";

const Learn = () => {
  const [vapi, setVapi] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    vapi.setMuted(!isMuted);
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  const startCallInline = () => {
    // vapi.start(assistantOptions); //from the website
    vapi.start("4b6c564d-7931-4227-b2f3-cbafd3c263c1");
  };

  const endCall = () => {
    vapi.stop();
  };

//   const assistantOptions = {
//     name: "Teach XR",
//     firstMessage:
//       "Hi, this is Teach XR. Let me know if you have any questions while you're reading!",
//     transcriber: {
//       provider: "deepgram",
//       model: "nova-2",
//       language: "en-US",
//     },
//     voice: {
//       provider: "playht",
//       voiceId: "jennifer",
//     },
//     model: {
//       // provider: "groq",
//       // model: "llama-3.1-70b-versatile",
//       provider: "openai",
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: `You’re a teacher who helps readers understand concepts, gives more context, or uses simple analogies to make things clearer for your students reading a book.
      
//       Most of the time, students will share a paragraph or a few pages from the book. Your job is to explain a specific part, summarize the whole thing, provide an analogy, or use any other method that helps them grasp the material better.
      
//       It’s important to keep the context of previous questions in mind so you can connect different parts of the book and deliver a smooth, cohesive answer.
      
//       Use casual language—phrases like "Umm...", "Well...", or "I mean" are great. Adding some humor or a light-hearted tone would also be appreciated.`,
//         },
//       ],
//     },
//     speechConfig: {
//         startSpeakingPlan: {
//           waitTimeBeforeSpeaking: 0.6, // Increased from default 0.4 seconds
//           smartEndpointing: true, // Enable advanced processing for detecting when customer finishes speaking
//           transcriptionBasedDetection: {
//             // Add custom rules for determining when the customer has stopped speaking
//             // For example, you could add specific phrases or patterns here
//           },
//         },
//     }
//   };

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_KEY);
    setVapi(vapiInstance);

    // vapiInstance.setMuted(!isMuted)

    console.log("starting hooks");
    vapiInstance.on("call-start", () => {
      //   setConnecting(false);
      setConnected(true);
    });

    vapiInstance.on("call-end", () => {
      //   setConnecting(false);
      setConnected(false);
    });

    // vapiInstance.on("speech-start", () => {
    //   setAssistantIsSpeaking(true);
    // });

    // vapiInstance.on("speech-end", () => {
    //   setAssistantIsSpeaking(false);
    // });

    // vapiInstance.on("volume-level", (level) => {
    //   setVolumeLevel(level);
    // });

    vapiInstance.on("message", (message) => {
      console.log("Message received:");
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newEntry = {
          timestamp: message.timestamp,
          role: message.role,
          text: message.transcript,
        };
        setChatHistory((prev) => {
          const updatedTranscripts = [...prev, newEntry];
          // console.log('Updated transcripts:', updatedTranscripts);
          return updatedTranscripts;
        });
      }
    });

    vapiInstance.on("error", (error) => {
      console.error(error);

      setConnecting(false);
      // if (isPublicKeyMissingError({ vapiError: error })) {
      //   setShowPublicKeyInvalidMessage(true);
      // }
    });
    return () => {
      console.log("cleanup");
      vapiInstance.stop();
    };
  }, []);

  useEffect(() => {
    // Function to update the state
    const updateMessage = () => {
      // Replace this with the logic to get the new message
      if (vapi && connected) {
        console.log("Sending new message...");
        vapi.send({
          type: "add-message",
          message: {
            role: "system",
            content: `The user might has some question about this. Here is the paragraph: "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.

Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched to the skin and splattered with mud." Just say "I'm ready for your questions about this pargraph"`,
          },
        });
        console.log("Updated message!");
      } else {
        console.log("what da hell");
      }
    };

    // Set up the interval to update every 10 seconds (10000 ms)
    const intervalId = setTimeout(updateMessage, 10000);
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [vapi, connected]);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
      <div className="w-2/3 flex items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-12">
          <div className="flex relative items-center justify-center w-full max-w-3xl h-64 rounded-lg shadow-lg overflow-hidden mt-8 mb-8">
            {isVoiceMode ? (
              <img
                src={robot1}
                alt="AI Assistant Avatar"
                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
              />
            ) : (
              <div>
                <img
                  src={robot1}
                  alt="Friendly robot assistant"
                  className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                />
                <img
                  src={image}
                  alt="AI learning concept"
                  className="w-40 transition-transform hover:scale-105"
                />
                <img
                  src={robot2}
                  alt="Another friendly robot assistant"
                  className="absolute top-0 right-12 w-24 transform rotate-[-12deg] transition-transform hover:scale-110 animate-spin"
                />
              </div>
            )}
          </div>
          <NavigationBar
            startCallInline={startCallInline}
            endCall={endCall}
            handleMuteToggle={handleMuteToggle}
            isMuted={isMuted}
            connected={connected}
          />
        </div>
      </div>

      {/* Right section: Placeholder for ChatBot (1/3 of the screen) */}
      <div className="w-1/3 flex items-center justify-center bg-black">
        <div className="bg-purple-700 text-white py-4 px-6 rounded-lg">
          <p>ChatBot will be here</p>
          <div>
            {chatHistory.length > 0
              ? chatHistory.map((entry, index) => (
                  <div key={index}>
                    <strong>{entry.timestamp}</strong> [{entry.role}]:{" "}
                    {entry.text}
                  </div>
                ))
              : "No transcript available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
