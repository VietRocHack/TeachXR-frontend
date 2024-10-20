import female1 from './assets/female1.png'
import female2 from './assets/female2.png'
import female3 from './assets/female3.png'
import female4 from './assets/female4.png'
import female5 from './assets/female5.png'
import male1 from './assets/male1.png'
import male2 from './assets/male2.png'
import male3 from './assets/male3.png'
import male4 from './assets/male4.png'
import male5 from './assets/male5.png'
import teacher from './assets/teacher.png'

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Vapi from "@vapi-ai/web";
import { VAPI_KEY } from "./utils";
import ChatBox from "./components/ChatBox";

const Learn = () => {
  const [vapi, setVapi] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    if (vapi) {
      setIsMuted(!isMuted);
      vapi.setMuted(!isMuted);
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  const startCallInline = () => {
    // vapi.start(assistantOptions); //from the website
    setIsVoiceMode(!isVoiceMode)
    vapi.start("4b6c564d-7931-4227-b2f3-cbafd3c263c1");
  };

  const endCall = () => {
    vapi.stop();
  };

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_KEY);
    setVapi(vapiInstance);

    // vapiInstance.setMuted(!isMuted)

    console.log("starting hooks");
    vapiInstance.on("call-start", () => {
      handleMuteToggle();
      setConnected(true);
    });

    vapiInstance.on("call-end", () => {
      //   setConnecting(false);
      setConnected(false);
    });

    vapiInstance.on("message", (message) => {
      console.log("Message received:");
      if (message.type === "transcript" && message.transcriptType === "final") {
        const chatMessage = {
          isFromUser: message.role === "user",
          textMessage: message.transcript,
          isImage: false,
          imageSrc: null,
        };
        setChatHistory((prev) => [...prev, chatMessage]);
      }
    });

    vapiInstance.on("error", (error) => {
      console.error(error);

      setConnecting(false);
    });
    return () => {
      console.log("cleanup");
      vapiInstance.stop();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
      <div className="w-2/3 flex items-center justify-center mt-8 mb-8">
        <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-32">
            <div className="flex flex-col relative items-center justify-center w-full h-100 mt-8">
                {isVoiceMode ? (
                    <div className="bg-purple-500 rounded-[15px]">
                        <img
                            src={female2}
                            alt="AI Assistant Avatar"
                            className="transition-transform"
                        />
                    </div>           
                ) : (
                <>
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
                  <p className="text-blue-200 text-center mt-8 text-2xl opacity-75">
                    Touch to empower your learning
                  </p>
                </>
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
      <div className="h-screen w-1/3 flex items-center justify-center bg-black">
        {/* <p>ChatBot will be here</p> */}
        {/* <div>
            {chatHistory.length > 0
              ? chatHistory.map((entry, index) => (
                  <div key={index}>
                    <strong>{entry.timestamp}</strong> [{entry.role}]:{" "}
                    {entry.text}
                  </div>
                ))
              : "No transcript available"}
          </div> */}
        <ChatBox
          messages={chatHistory}
          setMessages={setChatHistory}
          vapi={vapi}
          connected={connected}
        />
      </div>
    </div>
  );
};

export default Learn;
