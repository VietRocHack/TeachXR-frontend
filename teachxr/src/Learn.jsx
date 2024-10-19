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
    // if (!vapi) {
    //     console.error("VAPI instance is not initialized");
    //     return;
    //   }
    //   console.log("Starting call inline");
    vapi.start(assistantOptions); //from the website
  };

  const endCall = () => {
    vapi.stop();
  };

  const assistantOptions = {
    name: "Teach XR",
    firstMessage:
      "Hi, this is Teach XR. Let me know if you have any questions while you're reading!",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      // provider: "groq",
      // model: "llama-3.1-70b-versatile",
      provider: "openai",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You’re a teacher who helps readers understand concepts, gives more context, or uses simple analogies to make things clearer for your students reading a book.
      
      Most of the time, students will share a paragraph or a few pages from the book. Your job is to explain a specific part, summarize the whole thing, provide an analogy, or use any other method that helps them grasp the material better.
      
      It’s important to keep the context of previous questions in mind so you can connect different parts of the book and deliver a smooth, cohesive answer.
      
      Use casual language—phrases like "Umm...", "Well...", or "I mean" are great. Adding some humor or a light-hearted tone would also be appreciated.`,
        },
      ],
    },
  };

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

    return (
        <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
            {/* Left section: Learn component (2/3 of the screen) */}
            <div className="w-2/3 flex items-center justify-center mt-8 mb-8">
                <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-12">
                
                    <div className="flex relative items-center justify-center w-full max-w-3xl h-[600px] rounded-lg overflow-hidden mt-8 mb-8">
                        {isVoiceMode ? (
                            <img
                                src={robot1}
                                alt="AI Assistant Avatar"
                                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
                            />
                        ) : (
                            <>
                                {/* <img
                                    src={robot1}
                                    alt="Friendly robot assistant"
                                    className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                                /> */}
                                <div className="relative">
                                    {/* Outermost Gradient Circle with Shadow */}
                                    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-64 w-64 animate-pulse shadow-[0_0_50px_15px_rgba(139,92,246,0.3)]"></div>

                                    {/* Additional Outer Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full h-60 w-60 animate-pulse"></div>
                                    </div>

                                    {/* Original Outer Gradient Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-56 w-56 animate-pulse"></div>
                                    </div>

                                    {/* Additional Middle Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-52 w-52"></div>
                                    </div>

                                    {/* Original Middle Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full h-48 w-48"></div>
                                    </div>

                                    {/* Additional Inner Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-full h-44 w-44 flex items-center justify-center shadow-lg"></div>
                                    </div>

                                    {/* Original Inner Circle with Text */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-gradient-radial from-teal-400 via-emerald-500 to-cyan-600 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                                            <span className="text-white text-xl font-semibold"></span>
                                        </div>
                                    </div>
                                </div>
                                {/* Informative Message */}
                                <p className="text-blue-200 text-center mt-8 text-lg opacity-75">
                                    Touch to empower your learning
                                </p>
                            </>
                        )}
                    </div>

                    {/* Control buttons */}
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
